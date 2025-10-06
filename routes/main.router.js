import { Router } from "express";
import homeRouter from './home.router.js';
import authRouter from './auth.router.js'
import productRouter from './product.router.js'
import cartRouter from './cart.router.js'
import sessionsRouter from './sessions.router.js';

const router = Router({ mergeParams: true });

router.use('/', homeRouter);
router.use('/sessions', sessionsRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/carts', cartRouter);

export default router;