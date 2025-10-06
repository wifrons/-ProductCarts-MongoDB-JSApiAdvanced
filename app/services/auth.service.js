
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserMongoDAO } from "../dao/auth.mongo.dao.js";
import { UserDTO } from "../dto/auth.dto.js";
import { MailerService } from './mailer.service.js';


export class UserService {
    constructor() {
        this.userDAO = new UserMongoDAO();
    }

    async register(data) {
        const dto = new UserDTO(data);
        dto.validate();

        const exists = await this.userDAO.getOne({ email: dto.email });
        if (exists) throw new Error("Email already exists.");

        const hash = bcrypt.hashSync(dto.password, 10);
        const userData = { ...dto.toObject(), password: hash };
        return await this.userDAO.create(userData);
    }

    async login(email, password) {
        if (!email || !password) throw new Error("Credentials are missing / Invalid password.");

        const user = await this.userDAO.getOne({ email });
        if (!user) throw new Error("Invalid password.");

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error("Incorrect password.");

        const payload = { sub: String(user._id), email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { token, user };
    }

    async getUserById(id) {
        return await this.userDAO.getById(id);
    }
    
    async requestPasswordReset(email) {
        const user = await this.userDAO.findByEmail(email);
        if (!user) throw new Error("User not found");

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = Date.now() + 1000 * 60 * 30; // 30 min

        await this.userDAO.saveResetToken(user._id, token, expiresAt);

        const resetLink = `http://localhost:3000/reset-password/${token}`;
        const html = `<p>Click to recover your password:</p><a href="${resetLink}">${resetLink}</a>`;

        await MailerService.SendCustomEmail(user.email, "Password recovery.", html);
    }

    async resetPassword(token, newPassword) {
        const user = await this.userDAO.findByResetToken(token);
        if (!user) throw new Error("Invalid or expired token.");

        const hashed = await bcrypt.hash(newPassword, 10);
        await this.userDAO.updatePassword(user._id, hashed);
    }

}