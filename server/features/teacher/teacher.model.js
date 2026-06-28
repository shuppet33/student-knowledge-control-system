import { db } from '../../db/connect.js'

export const teacherModel = {
    async getSubjectsByUserId(userId) {
        const { rows } = await db.query(
            `
                SELECT
                    s.id,
                    s.name,
                    s.created_at
                FROM teacher_subjects ts
                JOIN subjects s
                    ON s.id = ts.subject_id
                WHERE ts.teacher_id = $1
                    AND s.deleted_at IS NULL
                ORDER BY s.name
            `,
            [userId],
        )

        return rows
    },

    async getSubjects() {
        const { rows } = await db.query(
            `
                SELECT
                    id,
                    name,
                    created_at
                FROM subjects
                WHERE deleted_at IS NULL
                ORDER BY name ASC
            `,
        )

        return rows
    },

    async getSubjectById(id) {
        const { rows } = await db.query(
            `
                SELECT id, name, created_at
                FROM subjects
                WHERE id = $1
                    AND deleted_at IS NULL
                LIMIT 1
            `,
            [id],
        )

        return rows[0]
    },

    async getSubjectByName(name) {
        const { rows } = await db.query(
            `
                SELECT id, name
                FROM subjects
                WHERE LOWER(name) = LOWER($1)
                    AND deleted_at IS NULL
                LIMIT 1
            `,
            [name],
        )

        return rows[0]
    },

    async updateSubjectName({ id, name }) {
        const { rows } = await db.query(
            `
                UPDATE subjects
                SET name = $2
                WHERE id = $1
                    AND deleted_at IS NULL
                RETURNING id, name, created_at
            `,
            [id, name],
        )

        return rows[0]
    },

    async getGroups() {
        const { rows } = await db.query(
            `
                SELECT
                    id,
                    name
                FROM groups
                WHERE deleted_at IS NULL
                ORDER BY name ASC
            `,
        )

        return rows
    },

    async getGroupById(id) {
        const { rows } = await db.query(
            `
                SELECT id, name
                FROM groups
                WHERE id = $1
                    AND deleted_at IS NULL
                LIMIT 1
            `,
            [id],
        )

        return rows[0]
    },

    async getSubjectGroups(id) {
        const { rows } = await db.query(
            `
                SELECT groups.id, groups.name
                FROM subject_groups
                JOIN groups
                    ON groups.id = subject_groups.group_id
                WHERE subject_groups.subject_id = $1
                    AND groups.deleted_at IS NULL
                ORDER BY groups.name ASC
            `,
            [id],
        )

        return rows
    },

    async getSubjectGroupRelation({ groupId, subjectId }) {
        const { rows } = await db.query(
            `
                SELECT id, subject_id, group_id
                FROM subject_groups
                WHERE group_id = $1
                    AND subject_id = $2
                LIMIT 1
            `,
            [groupId, subjectId],
        )

        return rows[0]
    },

    async addSubjectToGroup({ groupId, subjectId }) {
        const { rows } = await db.query(
            `
                INSERT INTO subject_groups (subject_id, group_id)
                VALUES ($1, $2)
                RETURNING id, subject_id, group_id
            `,
            [subjectId, groupId],
        )

        return rows[0]
    },

    async removeSubjectFromGroup({ groupId, subjectId }) {
        const { rows } = await db.query(
            `
                DELETE FROM subject_groups
                WHERE group_id = $1
                    AND subject_id = $2
                RETURNING id
            `,
            [groupId, subjectId],
        )

        return rows[0]
    },

    async getTeacherSubjectRelation({ teacher_id, subject_id }) {
        const { rows } = await db.query(
            `
                SELECT *
                FROM teacher_subjects
                WHERE teacher_id = $1
                    AND subject_id = $2
                LIMIT 1
            `,
            [teacher_id, subject_id],
        )

        return rows[0]
    },

    async createSubject(name) {
        const { rows } = await db.query(
            `
                INSERT INTO subjects (name)
                VALUES ($1)
                RETURNING *
            `,
            [name],
        )

        return rows[0]
    },

    async addSubjectToTeacher({ teacher_id, subject_id }) {
        const { rows } = await db.query(
            `
                INSERT INTO teacher_subjects (
                    teacher_id,
                    subject_id
                )
                VALUES ($1, $2)
                RETURNING *
            `,
            [teacher_id, subject_id],
        )

        return rows[0]
    },
}
