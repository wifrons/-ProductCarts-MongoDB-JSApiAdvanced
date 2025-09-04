import { Router } from 'express';
import { requiereJwtCookie } from '../middleware/auth.middleware.js'

const router = Router();

// RETORNA LOS DATOS ASOCIADOS AL LOGIN
router.get('/current', requiereJwtCookie, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const { _id, email, first_name, last_name, role } = req.user;

    res.status(200).json({ status: 'success', 
        user: {
            id: _id,
            email,
            first_name,
            last_name,
            role
        }
    });
});

export default router;
