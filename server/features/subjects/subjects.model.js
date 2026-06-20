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
