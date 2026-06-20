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
    async getGroupByName(name) {
        const query = `
            SELECT id, name
            FROM groups
            WHERE LOWER(name) = LOWER($1)
                AND deleted_at IS NULL
            LIMIT 1
        `

        const { rows } = await db.query(query, [name])

        return rows[0]
    },
    async getGroupById(id) {
        const query = `
            SELECT id, name
            FROM groups
            WHERE id = $1
                AND deleted_at IS NULL
            LIMIT 1
        `

        const { rows } = await db.query(query, [id])

        return rows[0]
    },
    async deleteGroup(id) {
        const query = `
            UPDATE groups
            SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL
                RETURNING id
        `

        const { rows } = await db.query(query, [id])

        return rows[0]
    },
    async getStudentById(id) {
        const query = `
            SELECT id, email, full_name
            FROM users
            WHERE id = $1
                AND role = 'student'
                AND deleted_at IS NULL
            LIMIT 1
        `

        const { rows } = await db.query(query, [id])

        return rows[0]
    },
    async getStudentGroupRelation({ groupId, studentId }) {
        const query = `
            SELECT id, student_id, group_id
            FROM student_groups
            WHERE group_id = $1
                AND student_id = $2
            LIMIT 1
        `

        const { rows } = await db.query(query, [groupId, studentId])

        return rows[0]
    },
    async addStudent({ groupId, studentId }) {
        const query = `
            INSERT INTO student_groups (student_id, group_id)
            VALUES ($1, $2)
            RETURNING id, student_id, group_id
        `

        const { rows } = await db.query(query, [studentId, groupId])

        return rows[0]
    },
    async removeStudent({ groupId, studentId }) {
        const query = `
            DELETE FROM student_groups
            WHERE group_id = $1
                AND student_id = $2
            RETURNING id
        `

        const { rows } = await db.query(query, [groupId, studentId])

        return rows[0]
    },
    async getGroupSubjects(groupId) {
        const query = `
            SELECT
                subjects.id,
                subjects.name,
                subjects.created_at
            FROM subject_groups
            JOIN subjects
                ON subjects.id = subject_groups.subject_id
            WHERE subject_groups.group_id = $1
                AND subjects.deleted_at IS NULL
            ORDER BY subjects.name ASC
        `

        const { rows } = await db.query(query, [groupId])

        return rows
    },
    async getSubjectById(id) {
        const query = `
            SELECT id, name
            FROM subjects
            WHERE id = $1
                AND deleted_at IS NULL
            LIMIT 1
        `

        const { rows } = await db.query(query, [id])

        return rows[0]
    },
    async getSubjectGroupRelation({ groupId, subjectId }) {
        const query = `
            SELECT id, subject_id, group_id
            FROM subject_groups
            WHERE group_id = $1
                AND subject_id = $2
            LIMIT 1
        `

        const { rows } = await db.query(query, [groupId, subjectId])

        return rows[0]
    },
    async addSubject({ groupId, subjectId }) {
        const query = `
            INSERT INTO subject_groups (subject_id, group_id)
            VALUES ($1, $2)
            RETURNING id, subject_id, group_id
        `

        const { rows } = await db.query(query, [subjectId, groupId])

        return rows[0]
    },
    async removeSubject({ groupId, subjectId }) {
        const query = `
            DELETE FROM subject_groups
            WHERE group_id = $1
                AND subject_id = $2
            RETURNING id
        `

        const { rows } = await db.query(query, [groupId, subjectId])

        return rows[0]
    },
}
