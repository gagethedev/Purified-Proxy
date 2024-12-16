import argon2 from "argon2"

export async function hashPassword(password) {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw new Error('Failed to hash password.');
    }
}

export async function verifyPassword(password, hashedPassword) {
    try {
        return await argon2.verify(hashedPassword, password);
    } catch (err) {
        console.error('Error verifying password:', err);
        throw new Error('Failed to verify password.');
    }
}
