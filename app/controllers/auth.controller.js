import { UserService } from '../services/auth.service.js';

const service = new UserService();

export const UserController = {
    async register(req, res) {
        try {
            await service.register(req.body);
            res.status(201).json({ message: "Registered User." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { token, user } = await service.login(req.body.email, req.body.password);

            res.cookie('access_token', token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 60 * 60 * 1000,
                path: '/'
            });

            res.json({ message: 'Success Login (JWT on Cookie)' });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },

    async me(req, res) {
        try {
            const user = await service.getUserById(req.user._id);
            if (!user) return res.status(404).json({ error: 'User not found.' });

            const { first_name, last_name, email, age, role } = user;
            res.json({ first_name, last_name, email, age, role });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    logout(req, res) {
        res.clearCookie('access_token', { path: '/' });
        res.json({ message: 'Logout Ok' });
    },

    async requestReset(req, res) {
        try {
            await service.requestPasswordReset(req.body.email);
            res.status(200).json({ message: "Email sent for recovery." });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async resetPassword(req, res) {
        try {
            await service.resetPassword(req.body.token, req.body.newPassword);
            res.status(200).json({ message: "Pwd updated successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};