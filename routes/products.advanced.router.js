import { Router } from "express";
import { requiereJwtCookie, requireRole } from '../middleware/auth.middleware.js';
import { productController as prodCtrl } from '../app/controllers/products.controller.js';

const router = Router();
router.use(requiereJwtCookie);

router.get('/', prodCtrl.list);
router.get('/:id', prodCtrl.get);
router.post('/', prodCtrl.create);
router.put('/:id', prodCtrl.update);
router.delete('/:id', prodCtrl.remove);

export default router;