import crypto from 'crypto';

export class UserDTO {
    constructor({ first_name, last_name, email, age, password }) {
        this.first_name = first_name?.trim();
        this.last_name = last_name?.trim();
        this.email = email?.toLowerCase().trim();
        this.age = Number(age);
        this.password = password;
    }

    validate() {
        if (!this.first_name || !this.last_name || !this.email || !this.age || !this.password) {
            throw new Error("All data is required. 🙃");
        }

        if (!/^\S+@\S+\.\S+$/.test(this.email)) {
            throw new Error("Invalid email format. 🙃");
        }

        if (this.password.length < 6) {
            throw new Error("Password must be at least 6 characters. 🙃");
        }

        if (isNaN(this.age) || this.age < 0) {
            throw new Error("Age must be a valid number. 🙃");
        }
    }
    toObject() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            age: this.age,
            password: this.password
        };
    }
    static generateResetToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    static formatResetEmail(token) {
        return {
            subject: "Recuperación de contraseña",
            html: `<p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
             <a href="https://tusitio.com/reset-password/${token}">Recuperar contraseña</a>`
        };
    }
}