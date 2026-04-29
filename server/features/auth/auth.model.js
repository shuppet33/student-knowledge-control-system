import {db} from "../../db/connect.js";

export const authModel = {
    async getUserByEmail(email) {
        const { rows } = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return rows[0];
    }
};