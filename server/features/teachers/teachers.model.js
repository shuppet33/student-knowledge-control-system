import { db } from '../../db/connect.js'

export const teachersModel = {
    async getTeachers() {
        const query = `
            SELECT
                id,
                email,
                full_name,
                created_at
            FROM users
            WHERE role = 'teacher'
                AND deleted_at IS NULL
            ORDER BY full_name ASC
        `

        const { rows } = await db.query(query)

        return rows
    },
}