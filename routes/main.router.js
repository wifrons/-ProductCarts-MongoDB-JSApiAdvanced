import { Router } from "express";
import homeRouter from './home.router.js';
import authRouter from './auth.router.js';
import cartsRouter from './carts.router.js';
import productsRouter from './products.router.js';

const router = Router({ mergeParams: true });
//(OK) TODOS
router.use('/', homeRouter);
router.use('/auth', authRouter);
router.use('/carts', cartsRouter);
router.use('/products', productsRouter);

export default router;