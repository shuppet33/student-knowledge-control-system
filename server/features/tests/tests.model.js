import { db } from '../../db/connect.js'

export const testsModel = {
    async getTests() {
        const query = `
            SELECT
                tests.subject_id,
                COALESCE(subjects.name, 'Без предмета') AS subject_name,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', tests.id::TEXT,
                        'title', tests.title,
                        'created_by', tests.created_by::TEXT,
                        'created_by_name', users.full_name,
                        'is_active', tests.is_active,
                        'is_private', tests.is_private,
                        'show_answers', tests.show_answers,
                        'show_score', tests.show_score,
                        'max_attempts', tests.max_attempts,
                        'created_at', tests.created_at
                    )
                    ORDER BY tests.created_at DESC
                ) AS tests
            FROM tests
            LEFT JOIN subjects
                ON subjects.id = tests.subject_id
            LEFT JOIN users
                ON users.id = tests.created_by
            WHERE tests.deleted_at IS NULL
            GROUP BY tests.subject_id, subjects.name
            ORDER BY subject_name ASC
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
