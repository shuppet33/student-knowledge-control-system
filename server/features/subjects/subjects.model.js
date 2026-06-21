import { db } from '../../db/connect.js'

export const subjectsModel = {
    async getSubjects() {
        const query = `
            SELECT
                id,
                name,
                created_at
            FROM subjects
            WHERE deleted_at IS NULL
            ORDER BY name ASC
        `

        const { rows } = await db.query(query)

        return rows
    },

    async createSubject(name) {
        const query = `
            INSERT INTO subjects (name)
            VALUES ($1)
            RETURNING *
        `

        const { rows } = await db.query(query, [name])

        return rows[0]
    },

    async getSubjectByName(name) {
        const query = `
            SELECT id, name
            FROM subjects
            WHERE LOWER(name) = LOWER($1)
                AND deleted_at IS NULL
            LIMIT 1
        `

        const { rows } = await db.query(query, [name])

        return rows[0]
    },

    async getSubjectById(id) {
        const query = `
            SELECT id, name, created_at
            FROM subjects
            WHERE id = $1
                AND deleted_at IS NULL
            LIMIT 1
        `

        const { rows } = await db.query(query, [id])

        return rows[0]
    },

    async updateSubjectName({ id, name }) {
        const query = `
            UPDATE subjects
            SET name = $2
            WHERE id = $1
                AND deleted_at IS NULL
            RETURNING id, name, created_at
        `

        const { rows } = await db.query(query, [id, name])

        return rows[0]
    },

    async getSubjectGroups(id) {
        const query = `
            SELECT groups.id, groups.name
            FROM subject_groups
            JOIN groups
                ON groups.id = subject_groups.group_id
            WHERE subject_groups.subject_id = $1
                AND groups.deleted_at IS NULL
            ORDER BY groups.name ASC
        `

        const { rows } = await db.query(query, [id])

        return rows
    },

    async getSubjectTeachers(id) {
        const query = `
            SELECT users.id, users.email, users.full_name
            FROM teacher_subjects
            JOIN users
                ON users.id = teacher_subjects.teacher_id
            WHERE teacher_subjects.subject_id = $1
                AND users.role = 'teacher'
                AND users.deleted_at IS NULL
            ORDER BY users.full_name ASC
        `

        const { rows } = await db.query(query, [id])

        return rows
    },

    async deleteSubject(id) {
        const query = `
            UPDATE subjects
            SET deleted_at = NOW()
            WHERE id = $1
                AND deleted_at IS NULL
            RETURNING id
        `

        const { rows } = await db.query(query, [id])

        return rows[0]
    },
}
