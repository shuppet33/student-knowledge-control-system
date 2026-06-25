import { db } from '../../db/connect.js'

export const studentModel = {
    async getSubjectsByUserId(userId) {
        const { rows } = await db.query(
            `
                SELECT
                    s.id,
                    s.name
                FROM student_groups stg
                JOIN groups g
                    ON g.id = stg.group_id
                JOIN subject_groups subg
                    ON subg.group_id = g.id
                JOIN subjects s
                    ON s.id = subg.subject_id
                WHERE stg.student_id = $1
                    AND g.deleted_at IS NULL
                    AND s.deleted_at IS NULL
                ORDER BY s.name
            `,
            [userId],
        )

        return rows
    },

    async getSubjectTestsByUserId(userId, subjectId) {
        const { rows } = await db.query(
            `
        SELECT
            s.id AS subject_id,
            s.name AS subject_name,

            t.id AS test_id,
            t.title AS test_title,
            t.created_at AS test_created_at
        FROM student_groups stg
        JOIN subject_groups subg
            ON subg.group_id = stg.group_id
        JOIN subjects s
            ON s.id = subg.subject_id
        LEFT JOIN teacher_test_groups ttg
            ON ttg.group_id = stg.group_id
        LEFT JOIN teacher_tests tt
            ON tt.id = ttg.teacher_tests
        LEFT JOIN tests t
            ON t.id = tt.test_id
            AND t.subject_id = s.id
        WHERE stg.student_id = $1
            AND s.id = $2
            AND s.deleted_at IS NULL
        ORDER BY t.created_at DESC
    `,
            [userId, subjectId],
        )

        return rows
    },
}
