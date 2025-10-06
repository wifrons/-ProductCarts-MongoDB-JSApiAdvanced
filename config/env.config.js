import dotenv from 'dotenv';
dotenv.config();

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3000', 10),
    MONGO_TARGET: process.env.MONGO_TARGET || 'LOCAL',
    MONGO_URI: process.env.MONGO_URI || '',
    MONGO_URI_ATLAS: process.env.MONGO_URI_ATLAS || '',
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    JWT_SECRET: process.env.JWT_SECRET || '',

    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: parseInt(process.env.PORT || '465',10),
    SMTP_SECURE: process.env.SMTP_SECURE || 'true',
    EMAIL_USER: process.env.EMAIL_USER || 'wifrons@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || '',
    EMAIL_FROM: process.env.EMAIL_FROM || 'wifrons@gmail.com'
};

export function validateEnv() {
    const missing = [];
    if (!env.SESSION_SECRET) missing.push('SESSION_SECRET');
    if (!env.JWT_SECRET) missing.push('JWT_SECRET');
    if (env.MONGO_TARGET === 'LOCAL' && !env.MONGO_URI) missing.push('MONGO_URI');
    if (env.MONGO_TARGET === 'ATLAS' && !env.MONGO_URI_ATLAS) missing.push('MONGO_URI_ATLAS');
    if (!env.SMTP_HOST) missing.push('SMTP_HOST');
    if (!env.SMTP_PORT) missing.push('SMTP_PORT');
    if (!env.SMTP_SECURE) missing.push('SMTP_SECURE');
    if (!env.EMAIL_USER) missing.push('EMAIL_USER');
    if (!env.EMAIL_PASS) missing.push('EMAIL_PASS');
    if (!env.EMAIL_FROM) missing.push('EMAIL_FROM');
    if (missing.length) {
        console.error('[ENV] 😥 Missing environment variables 🏜️ 🏝️ 🏞️ -->> ', missing.join(', '));
        process.exit(1);
    }
}

export function getPublicEnv() {
    return {
        NODE_ENV: env.NODE_ENV,
        PORT: env.PORT,
        MONGO_TARGET: env.MONGO_TARGET
    };
}

export default env;