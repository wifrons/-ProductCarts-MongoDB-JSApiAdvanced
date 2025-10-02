import CustomRouter from "./custom.router.js";
//import { requiereJwtCookie } from '../middleware/auth.middleware.js';
import  {policies, requiereJwtCookie}  from "../middleware/policies.middleware.js";
import ProductsModel from "../config/models/product.model.js";

const router = new CustomRouter({ mergeParams: true });

// Params loader (carga previa del :id)
router.params('id', async (req, res, next, id) => {
    try {
        const s = await ProductsModel.findById(id).lean();
        req.productsLoader = s || null;
    } catch (_) {
        req.productsLoader = null;
    }
    next();
});

// Ruta con middleware en cadena (orden claro): auth -> politica de roles -> handler
router.get('/products/:id', requiereJwtCookie, policies('admin', 'user'), (req, res) => {
    if (!req.productsLoader) return res.status(404).json({ error: "Producto no encontrado (pre-cargado)" })
    res.status(200).json({ loadedByParam: true, product: req.productsLoader });
})

// Enrutador Ping
router.group('/v1', (v1) => {
    v1.get('/ping', (req, res) => res.json({ ok: true, version: 'v1' }));
})

//BORRAR
// Subrouter anidado con mergeParams: /products/:id/courses/*
router.group('/products/:id', (sub) => {
    sub.get('/courses', requiereJwtCookie, (req, res) => {
        res.json({
            productId: req.params.id,
            note: "Ejemplo de subrouter con mergeParams",
            courses: ['JS Avanzado', 'DB Basico']
        });
    });
});

//(OK)
// Subrouter anidado con mergeParams: /products/:id/stock/*
router.group('/products/:id', (sub) => {
    sub.get('/stock', requiereJwtCookie, (req, res) => {
        const product = req.productsLoader;

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado (stock)" });
        }

        res.status(200).json({
            productId: req.params.id,
            stock: product.stock,
            nombre: product.title,
            precio: product.price
        });
    });
});

// Router async con error capturado automaticamente por CustomRouter
router.get('/boom', async (req, res) => {
    throw new Error('Explosion controlada para demo de manejo de errores async');
});

export default router.router;
