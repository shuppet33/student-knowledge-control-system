import {db} from "../../db/connect.js";

export const authModel = {
    async getUserByEmail(email) {
        const { rows } = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return rows[0];
    },

    async createRefreshToken({ userId, tokenHash, expiresAt }) {
        await db.query(
            `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
         VALUES ($1, $2, $3)`,
            [userId, tokenHash, expiresAt]
        );
    },

    async getRefreshTokensByUser(userId) {
        const { rows } = await db.query(
            `SELECT * FROM refresh_tokens WHERE user_id = $1`,
            [userId]
        );
        return rows;
    },

    async deleteRefreshToken(id) {
        await db.query(
            `DELETE FROM refresh_tokens WHERE id = $1`,
            [id]
        );
    }
};