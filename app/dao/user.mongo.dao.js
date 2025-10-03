import { BaseDAO } from "./base.dao.js";
import { User } from "../../config/models/user.model.js";

export class UserMongoDAO extends BaseDAO {
    constructor() { super(User); }

    async findByEmail(email) {
        return this.model.findOne({ email });
    }

    async saveResetToken(userId, token, expiresAt) {
        return this.model.findByIdAndUpdate(userId, {
            resetToken: token,
            resetTokenExpires: expiresAt
        });
    }

    async findByResetToken(token) {
        return this.model.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });
    }

    async updatePassword(userId, hashedPassword) {
        return this.model.findByIdAndUpdate(userId, {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpires: null
        });
    }



}