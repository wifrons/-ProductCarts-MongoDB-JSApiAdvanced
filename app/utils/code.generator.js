import crypto from 'crypto';

export const generateUniqueCode = () => {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(4).toString('hex');
    return `${timestamp}-${random}`.toUpperCase();
};
