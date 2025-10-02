
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserMongoDAO } from "../dao/user.mongo.dao.js";
import { UserDTO } from "../dto/users.dto.js";

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
}