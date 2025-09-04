import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { requiereJwtCookie } from "../middleware/auth.middleware.js";
import { User } from '../config/models/user.model.js';

const router = Router();

//(OK)
//RETORNA LOS DATOS ASOCIADOS AL LOGIN
router.get('/jwt/me', requiereJwtCookie, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).lean();
        if (!user) return res.status(404).json({ error: 'User not found.' });
        const { first_name, last_name, email, age, role } = user;
        res.json({ first_name, last_name, email, age, role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

//(OK)
//REGISTRA UN USUARIO.
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({ error: "All data is required. 🙃" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists." });

    //const hash = await bcrypt.hash(password, 10);
    const hash = bcrypt.hashSync(password, 10);

    await User.create({ first_name, last_name, email, age, password: hash });

    res.status(201).json({ message: "Registered User." });
});

//(OK)
//HACER LOGIN
router.post('/jwt/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Credentials are missing / Invalid password.' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid password' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Incorrect password' });

    const payload = { sub: String(user._id), email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Cookie httpOnly
    res.cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'lax', // 'strict' = Produccion
        secure: false, // 'true' = en produccion usamos https
        maxAge: 60 * 60 * 1000,
        path: '/'
    });

    res.json({ message: 'Success Login (JWT on Cookie)' });
});

//(OK)
//HACER LOGOUT
router.post('/jwt/logout', (req, res) => {
    res.clearCookie('access_token', { path: '/' });
    res.json({ message: 'Logout Ok' })
});

export default router;