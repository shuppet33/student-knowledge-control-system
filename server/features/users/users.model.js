import { db } from '../../db/connect.js'

export const usersModel = {
    async getUsers() {
        const query = `
            SELECT
                id,
                email,
                role,
                full_name,
                created_at
            FROM users
            WHERE deleted_at IS NULL
            ORDER BY created_at DESC
        `

        const { rows } = await db.query(query)

        return rows
    },
    async getUserByEmail(email) {
        const query = `
            SELECT *
            FROM users
            WHERE email = $1
                AND deleted_at IS NULL
            LIMIT 1
        `

        const { rows } = await db.query(query, [email])

        return rows[0]
    },
    async createUser({ email, password_hash, role, full_name }) {
        const query = `
            INSERT INTO users (
                email,
                password_hash,
                role,
                full_name
            )
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                email,
                role,
                full_name,
                created_at
        `

        const values = [email, password_hash, role, full_name]

        const { rows } = await db.query(query, values)

        return rows[0]
    },
    async deleteUser(id) {
        const query = `
            UPDATE users
            SET deleted_at = NOW()
            WHERE id = $1
        `

        await db.query(query, [id])
    },
}
