import { Router } from 'express';
import { UserController } from '../app/controllers/users.controller.js';
//import { requiereJwtCookie } from '../middleware/auth.middleware.js';
import { requiereJwtCookie } from '../middleware/policies.middleware.js';

const router = Router();

router.get('/jwt/me', requiereJwtCookie, UserController.me);
router.post('/register', UserController.register);
router.post('/jwt/login', UserController.login);
router.post('/jwt/logout', UserController.logout);

export default router;