import { db } from '../../db/connect.js'

export const studentsModel = {
    async getStudents() {
        const query = `
            SELECT
                id,
                email,
                full_name,
                created_at
            FROM users
            WHERE role = 'student'
                AND deleted_at IS NULL
            ORDER BY full_name ASC
        `

        const { rows } = await db.query(query)

        return rows
    },
}
