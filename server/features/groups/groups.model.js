import { db } from '../../db/connect.js'

export const groupsModel = {
    async getGroups() {
        const query = `
            SELECT
                id,
                name
            FROM groups
            WHERE deleted_at IS NULL
            ORDER BY name ASC
        `

        const { rows } = await db.query(query)

        return rows
    },
    async createGroup(name) {
        const query = `
            INSERT INTO groups (name)
            VALUES ($1)
            RETURNING *
        `

        const { rows } = await db.query(query, [name])

        return rows[0]
    },
    async deleteGroup(id) {
        const query = `
            UPDATE groups
            SET deleted_at = NOW()
            WHERE id = $1
        `

        await db.query(query, [id])
    },
}