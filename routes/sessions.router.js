import { Router } from 'express';
import { requiereJwtCookie } from '../middleware/policies.middleware.js'
import { SessionController } from '../app/controllers/session.controller.js';

const router = Router();

router.get('/current', requiereJwtCookie, SessionController.current);

export default router;
