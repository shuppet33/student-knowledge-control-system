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

    async getTeacherSubjects(teacher_id) {
        const query = `
        SELECT
            subjects.id,
            subjects.name,
            subjects.created_at
        FROM teacher_subjects
        JOIN subjects
            ON subjects.id = teacher_subjects.subject_id
        WHERE teacher_subjects.teacher_id = $1
            AND subjects.deleted_at IS NULL
        ORDER BY subjects.name ASC
    `

        const { rows } = await db.query(query, [teacher_id])

        return rows
    },
    async getTeacherSubjectRelation({ teacher_id, subject_id }) {
        const query = `
        SELECT *
        FROM teacher_subjects
        WHERE teacher_id = $1
            AND subject_id = $2
        LIMIT 1
    `

        const values = [teacher_id, subject_id]

        const { rows } = await db.query(query, values)

        return rows[0]
    },

    async getTeacherSubjectTests({ teacher_id, subject_id }) {
        const query = `
        SELECT
            tests.id,
            tests.title,
            tests.subject_id,
            tests.is_active,
            tests.is_private,
            tests.show_answers,
            tests.show_score,
            tests.max_attempts,
            tests.created_at,
            teacher_tests.id AS teacher_test_id
        FROM teacher_tests
        JOIN tests
            ON tests.id = teacher_tests.test_id
        WHERE teacher_tests.teacher_id = $1
            AND tests.subject_id = $2
            AND tests.deleted_at IS NULL
        ORDER BY tests.created_at DESC
    `

        const values = [teacher_id, subject_id]

        const { rows } = await db.query(query, values)

        return rows
    },

    async addSubjectToTeacher({ teacher_id, subject_id }) {
        const query = `
            INSERT INTO teacher_subjects (
                teacher_id,
                subject_id
            )
            VALUES ($1, $2)
            RETURNING *
        `

        const values = [teacher_id, subject_id]

        const { rows } = await db.query(query, values)

        return rows[0]
    },

    async removeSubjectFromTeacher({ teacher_id, subject_id }) {
        const query = `
            DELETE FROM teacher_subjects
            WHERE teacher_id = $1
                AND subject_id = $2
        `

        const values = [teacher_id, subject_id]

        await db.query(query, values)
    },
}
