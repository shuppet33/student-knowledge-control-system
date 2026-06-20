import { db } from '../../db/connect.js'

export const testsModel = {
    async getTests() {
        const query = `
            SELECT
                tests.id,
                tests.title,
                tests.subject_id,
                subjects.name AS subject_name,
                tests.created_by,
                users.full_name AS created_by_name,
                tests.is_active,
                tests.is_private,
                tests.show_answers,
                tests.show_score,
                tests.max_attempts,
                tests.created_at
            FROM tests
            LEFT JOIN subjects
                ON subjects.id = tests.subject_id
            LEFT JOIN users
                ON users.id = tests.created_by
            WHERE tests.deleted_at IS NULL
            ORDER BY tests.created_at DESC
        `

        const { rows } = await db.query(query)

        return rows
    },

    async deleteTest(id) {
        const query = `
            UPDATE tests
            SET
                deleted_at = NOW(),
                is_active = FALSE
            WHERE id = $1
                AND deleted_at IS NULL
            RETURNING id
        `

        const { rows } = await db.query(query, [id])

        return rows[0]
    },
}
