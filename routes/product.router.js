import { Router } from "express";
import { requiereJwtCookie, requireRole } from '../middleware/policies.middleware.js';
import { productController as prodCtrl } from '../app/controllers/product.controller.js';

const router = Router();
router.use(requiereJwtCookie);

router.get('/', prodCtrl.list);
router.get('/:id', prodCtrl.get);
router.post('/', requireRole('admin'), prodCtrl.create);
router.put('/:id', requireRole('admin'), prodCtrl.update);
router.delete('/:id', requireRole('admin'), prodCtrl.remove);

export default router;