import { db } from '../../db/connect.js'

export const studentsModel = {
    async getStudents() {
        const query = `
            WITH active_students AS (
                SELECT id, email, full_name, created_at
                FROM users
                WHERE role = 'student'
                    AND deleted_at IS NULL
            ),
            student_groups_data AS (
                SELECT
                    groups.id AS group_id,
                    groups.name AS group_name,
                    COALESCE(
                        JSONB_AGG(
                            DISTINCT JSONB_BUILD_OBJECT(
                                'id', students.id::TEXT,
                                'email', students.email,
                                'full_name', students.full_name,
                                'created_at', students.created_at
                            )
                        ) FILTER (WHERE students.id IS NOT NULL),
                        '[]'::JSONB
                    ) AS students
                FROM groups
                LEFT JOIN student_groups
                    ON student_groups.group_id = groups.id
                LEFT JOIN active_students AS students
                    ON students.id = student_groups.student_id
                WHERE groups.deleted_at IS NULL
                GROUP BY groups.id, groups.name
            ),
            students_without_group AS (
                SELECT COALESCE(
                    JSONB_AGG(
                        JSONB_BUILD_OBJECT(
                            'id', students.id::TEXT,
                            'email', students.email,
                            'full_name', students.full_name,
                            'created_at', students.created_at
                        )
                        ORDER BY students.full_name ASC
                    ),
                    '[]'::JSONB
                ) AS students
                FROM active_students AS students
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM student_groups
                    JOIN groups
                        ON groups.id = student_groups.group_id
                        AND groups.deleted_at IS NULL
                    WHERE student_groups.student_id = students.id
                )
            )
            SELECT group_id, group_name, students
            FROM (
                SELECT
                    0 AS sort_order,
                    NULL::BIGINT AS group_id,
                    'Нет группы'::TEXT AS group_name,
                    students
                FROM students_without_group

                UNION ALL

                SELECT
                    1 AS sort_order,
                    group_id,
                    group_name,
                    students
                FROM student_groups_data
            ) AS grouped_students
            ORDER BY sort_order ASC, group_name ASC
        `

        const { rows } = await db.query(query)

        return rows
    },
}
