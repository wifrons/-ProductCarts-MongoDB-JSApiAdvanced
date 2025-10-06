import { Router } from "express";
import { CartController } from "../app/controllers/cart.controller.js";
import { requiereJwtCookie, extractUserId } from '../middleware/policies.middleware.js';

const router = Router();
router.use(requiereJwtCookie, extractUserId);

router.get("/", CartController.getCart);
router.post("/", CartController.createCart);
router.post("/product/:pid", CartController.addProduct);
router.delete("/product/:pid", CartController.removeProduct);
router.delete("/", CartController.clearCart);
router.post('/purchase', CartController.purchaseCart);

export default router;