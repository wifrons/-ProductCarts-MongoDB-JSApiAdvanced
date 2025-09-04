import { Router } from "express";
import ProductsModel from "../config/models/product.model.js";
import { requiereJwtCookie, requireRole, extractUserId } from '../middleware/auth.middleware.js'

const router = Router();

//(OK)
//OBTENER TODOS LOS PRODUCTOS
router.get("/", async (req, res) => {
    try {
        const response = await ProductsModel.find().lean();
        if (response) {
            res.status(200).json({ status: "success", response });
        } else {
            res.status(404).json({ status: "failed", message: "products not found." });
        }

    } catch (error) {
        res.status(400).json({ status: "Error getting products.", message: error.message });
        console.error(error.message);
    }
});

//(OK)
//OBTENER UN PRODUCTO ESPECIFICO
router.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const response = await ProductsModel.findOne({ _id: pid });
        if (response) {
            res.status(200).json({ status: "success to product get by id", message: response });
        } else {
            res.status(404).json({ status: "product not found", message: response });
        }
    } catch (error) {
        res.status(500).json({ status: "error to product get by id", message: error.message });
        console.error("error to product get by id", error.message);
    }
});

//(OK)
//INSERTAR UN PRODUCTO ESPECIFICADO
router.post("/", requiereJwtCookie, requireRole('admin', 'user'), async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
            return res.status(404).json({ error: `All data is required. 🙃` });
        }
        const response = await ProductsModel.insertOne(
            { title, description, code, price, status, stock, category, thumbnails }
        );
        if (response) {
            res.status(200).json({ status: "success to product insert", message: response });
        } else {
            res.status(404).json({ status: "failed to product insert", message: response });
        }
    } catch (error) {
        res.status(500).json({ status: "error to product insert", message: error.message });
        console.error("error to product insert", error.message);
    }
});

//(OK)
//ACTUALIZAR UN PRODUCTO ESPECIFICADO
router.put("/:pid", requiereJwtCookie, requireRole('admin'), async (req, res) => {
    try {
        const pid = req.params.pid;
        const { body } = req;
        const response = await ProductsModel.updateOne({ _id: pid }, {
            $set: { ...body }
        });
        if (response) {
            res.status(200).json({ status: "success to product update", message: response });
        } else {
            res.status(404).json({ status: "failed to product update", message: response });
        }

    } catch (error) {
        res.status(500).json({ status: "error to product update", message: error.message });
        console.error("error to product update", error.message);
    }
});

//(OK)
//ELIMINAR UN PRODUCTO ESPECIFICADO
router.delete("/:pid", requiereJwtCookie, requireRole('admin'), async (req, res) => {
    try {
        const pid = req.params.pid;
        const response = await ProductsModel.findByIdAndDelete(pid);
        if (response) {
            res.status(200).json({ status: "success to product delete", message: response });
        } else {
            res.status(404).json({ status: "failed to product delete", message: response });
        }
    } catch (error) {
        res.status(500).json({ status: "error to product delete", message: error.message });
        console.error("error to product delete", error.message);
    }
});

export default router;