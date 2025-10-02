import { Router } from "express";
import homeRouter from './home.router.js';
import cartsRouter from './carts.router.js';
import authAdvRouter from './auth.advanced.router.js'
import productAdvRouter from './products.advanced.router.js'
import sessionsRouter from './sessions.router.js';

const router = Router({ mergeParams: true });
//(OK) TODOS
router.use('/', homeRouter);
router.use('/sessions', sessionsRouter);
router.use('/carts', cartsRouter);
router.use('/auth', authAdvRouter);
router.use('/products', productAdvRouter);

export default router;