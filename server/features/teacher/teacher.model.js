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

    async getSubjectTests({ teacherId, subjectId }) {
        const { rows } = await db.query(
            `
                SELECT
                    tests.id,
                    tests.title,
                    tests.subject_id,
                    tests.is_active,
                    tests.created_at,
                    teacher_tests.id AS teacher_test_id,
                    tests.created_by,
                    authors.full_name AS created_by_name,
                    COALESCE(
                        ARRAY_REMOVE(ARRAY_AGG(teacher_test_groups.group_id), NULL),
                        '{}'
                    ) AS group_ids
                FROM teacher_tests
                JOIN tests
                    ON tests.id = teacher_tests.test_id
                LEFT JOIN users AS authors
                    ON authors.id = tests.created_by
                LEFT JOIN teacher_test_groups
                    ON teacher_test_groups.teacher_tests = teacher_tests.id
                WHERE teacher_tests.teacher_id = $1
                    AND tests.subject_id = $2
                    AND tests.deleted_at IS NULL
                GROUP BY
                    tests.id,
                    tests.title,
                    tests.subject_id,
                    tests.is_active,
                    tests.created_at,
                    teacher_tests.id,
                    tests.created_by,
                    authors.full_name
                ORDER BY tests.created_at DESC
            `,
            [teacherId, subjectId],
        )

        return rows
    },

    async getTeacherTestDetails({ teacherId, teacherTestId }) {
        const { rows } = await db.query(
            `
                WITH test_data AS (
                    SELECT
                        tests.id,
                        tests.title,
                        tests.subject_id,
                        tests.is_active,
                        tests.created_at,
                        teacher_tests.id AS teacher_test_id,
                        tests.created_by,
                        authors.full_name AS created_by_name,
                        active_versions.id AS test_version_id
                    FROM teacher_tests
                    JOIN tests
                        ON tests.id = teacher_tests.test_id
                    LEFT JOIN users AS authors
                        ON authors.id = tests.created_by
                    LEFT JOIN test_versions AS active_versions
                        ON active_versions.test_id = tests.id
                        AND active_versions.is_active = TRUE
                    WHERE teacher_tests.id = $2
                        AND teacher_tests.teacher_id = $1
                        AND tests.deleted_at IS NULL
                    LIMIT 1
                ),
                groups_data AS (
                    SELECT
                        teacher_test_groups.teacher_tests,
                        COALESCE(
                            ARRAY_REMOVE(ARRAY_AGG(teacher_test_groups.group_id), NULL),
                            '{}'
                        ) AS group_ids
                    FROM teacher_test_groups
                    WHERE teacher_test_groups.teacher_tests = $2
                    GROUP BY teacher_test_groups.teacher_tests
                ),
                questions_data AS (
                    SELECT
                        question_rows.test_version_id,
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id', question_rows.id,
                                'text', question_rows.text,
                                'type', question_rows.type,
                                'position', question_rows.position,
                                'answers', question_rows.answers
                            )
                            ORDER BY question_rows.position ASC
                        ) AS questions,
                        COUNT(question_rows.id)::INT AS questions_count
                    FROM (
                        SELECT
                            questions.id::TEXT AS id,
                            questions.test_version_id,
                            questions.text,
                            questions.type,
                            questions.position,
                            COALESCE(
                                JSON_AGG(
                                    JSON_BUILD_OBJECT(
                                        'id', answers.id::TEXT,
                                        'text', answers.text,
                                        'is_correct', answers.is_correct
                                    )
                                    ORDER BY answers.id
                                ) FILTER (WHERE answers.id IS NOT NULL),
                                '[]'::JSON
                            ) AS answers
                        FROM questions
                        LEFT JOIN answers
                            ON answers.question_id = questions.id
                        WHERE questions.deleted_at IS NULL
                        GROUP BY
                            questions.id,
                            questions.test_version_id,
                            questions.text,
                            questions.type,
                            questions.position
                    ) AS question_rows
                    GROUP BY question_rows.test_version_id
                )
                SELECT
                    test_data.id,
                    test_data.title,
                    test_data.subject_id,
                    test_data.is_active,
                    test_data.created_at,
                    test_data.teacher_test_id,
                    test_data.created_by,
                    test_data.created_by_name,
                    test_data.test_version_id,
                    COALESCE(groups_data.group_ids, '{}') AS group_ids,
                    COALESCE(questions_data.questions, '[]'::JSON) AS questions,
                    COALESCE(questions_data.questions_count, 0) AS questions_count
                FROM test_data
                LEFT JOIN groups_data
                    ON groups_data.teacher_tests = test_data.teacher_test_id
                LEFT JOIN questions_data
                    ON questions_data.test_version_id = test_data.test_version_id
            `,
            [teacherId, teacherTestId],
        )

        return rows[0]
    },

    async createTeacherTest({ teacherId, subjectId, title, groupIds, questions }) {
        const { rows: subjectRelations } = await db.query(
            `
                SELECT id
                FROM teacher_subjects
                WHERE teacher_id = $1
                    AND subject_id = $2
                LIMIT 1
            `,
            [teacherId, subjectId],
        )

        if (!subjectRelations[0]) {
            return null
        }

        const { rows: tests } = await db.query(
            `
                INSERT INTO tests (
                    title,
                    subject_id,
                    created_by,
                    is_active
                )
                VALUES ($1, $2, $3, TRUE)
                RETURNING id
            `,
            [title, subjectId, teacherId],
        )
        const testId = tests[0].id

        const { rows: teacherTests } = await db.query(
            `
                INSERT INTO teacher_tests (
                    teacher_id,
                    test_id
                )
                VALUES ($1, $2)
                RETURNING id
            `,
            [teacherId, testId],
        )
        const teacherTestId = teacherTests[0].id

        const { rows: versions } = await db.query(
            `
                INSERT INTO test_versions (test_id, is_active)
                VALUES ($1, TRUE)
                RETURNING id
            `,
            [testId],
        )
        const testVersionId = versions[0].id

        if (groupIds.length) {
            await db.query(
                `
                    INSERT INTO teacher_test_groups (
                        teacher_tests,
                        group_id
                    )
                    SELECT $1, subject_groups.group_id
                    FROM subject_groups
                    WHERE subject_groups.subject_id = $2
                        AND subject_groups.group_id = ANY($3::BIGINT[])
                `,
                [teacherTestId, subjectId, groupIds],
            )
        }

        for (const [index, question] of questions.entries()) {
            const { rows: insertedQuestions } = await db.query(
                `
                    INSERT INTO questions (
                        test_version_id,
                        text,
                        type,
                        position
                    )
                    VALUES ($1, $2, $3, $4)
                    RETURNING id
                `,
                [
                    testVersionId,
                    question.text ?? '',
                    question.type ?? 'single',
                    index + 1,
                ],
            )
            const questionId = insertedQuestions[0].id

            for (const answer of question.answers ?? []) {
                await db.query(
                    `
                        INSERT INTO answers (
                            question_id,
                            text,
                            is_correct
                        )
                        VALUES ($1, $2, $3)
                    `,
                    [
                        questionId,
                        answer.text,
                        answer.is_correct,
                    ],
                )
            }
        }

        return { id: teacherTestId }
    },

    async updateTeacherTestQuestions({ teacherId, teacherTestId, questions }) {
        const isExistingId = (id) => /^\d+$/.test(String(id))

        const { rows: tests } = await db.query(
            `
                SELECT
                    tests.id AS test_id,
                    active_versions.id AS test_version_id
                FROM teacher_tests
                JOIN tests
                    ON tests.id = teacher_tests.test_id
                LEFT JOIN test_versions AS active_versions
                    ON active_versions.test_id = tests.id
                    AND active_versions.is_active = TRUE
                WHERE teacher_tests.id = $2
                    AND teacher_tests.teacher_id = $1
                    AND tests.deleted_at IS NULL
                LIMIT 1
            `,
            [teacherId, teacherTestId],
        )

        const test = tests[0]

        if (!test) {
            return null
        }

        let testVersionId = test.test_version_id

        if (!testVersionId) {
            const { rows: versions } = await db.query(
                `
                    INSERT INTO test_versions (test_id, is_active)
                    VALUES ($1, TRUE)
                    RETURNING id
                `,
                [test.test_id],
            )

            testVersionId = versions[0].id
        }

        const existingQuestionIds = questions
            .map((question) => question.id)
            .filter(isExistingId)

        await db.query(
            `
                UPDATE questions
                SET deleted_at = NOW()
                WHERE test_version_id = $1
                    AND deleted_at IS NULL
                    AND NOT (id = ANY($2::BIGINT[]))
            `,
            [testVersionId, existingQuestionIds],
        )

        for (const [index, question] of questions.entries()) {
            const position = index + 1
            let questionId = question.id
            const answers = question.answers ?? []

            if (isExistingId(question.id)) {
                const { rows } = await db.query(
                    `
                        UPDATE questions
                        SET
                            text = $3,
                            type = COALESCE($4, questions.type),
                            position = $5
                        WHERE id = $1
                            AND test_version_id = $2
                            AND deleted_at IS NULL
                        RETURNING id
                    `,
                    [
                        question.id,
                        testVersionId,
                        question.text ?? '',
                        question.type ?? 'single',
                        position,
                    ],
                )

                if (!rows[0]) {
                    continue
                }
            } else {
                const { rows } = await db.query(
                    `
                        INSERT INTO questions (
                            test_version_id,
                            text,
                            type,
                            position
                        )
                        VALUES ($1, $2, $3, $4)
                        RETURNING id
                    `,
                    [
                        testVersionId,
                        question.text ?? '',
                        question.type ?? 'single',
                        position,
                    ],
                )

                questionId = rows[0].id
            }

            const existingAnswerIds = answers
                .map((answer) => answer.id)
                .filter(isExistingId)

            await db.query(
                `
                    DELETE FROM answers
                    WHERE question_id = $1
                        AND NOT (id = ANY($2::BIGINT[]))
                `,
                [questionId, existingAnswerIds],
            )

            for (const answer of answers) {
                if (isExistingId(answer.id)) {
                    await db.query(
                        `
                            UPDATE answers
                            SET
                                text = $3,
                                is_correct = $4
                            WHERE id = $1
                                AND question_id = $2
                        `,
                        [
                            answer.id,
                            questionId,
                            answer.text,
                            answer.is_correct,
                        ],
                    )
                } else {
                    await db.query(
                        `
                            INSERT INTO answers (
                                question_id,
                                text,
                                is_correct
                            )
                            VALUES ($1, $2, $3)
                        `,
                        [
                            questionId,
                            answer.text,
                            answer.is_correct,
                        ],
                    )
                }
            }
        }

        return { id: teacherTestId }
    },

    async updateTeacherTest({ teacherId, teacherTestId, title, isActive }) {
        const { rows } = await db.query(
            `
                UPDATE tests
                SET
                    title = COALESCE($3, tests.title),
                    is_active = COALESCE($4, tests.is_active)
                FROM teacher_tests
                WHERE teacher_tests.test_id = tests.id
                    AND teacher_tests.id = $2
                    AND teacher_tests.teacher_id = $1
                    AND tests.deleted_at IS NULL
                RETURNING
                    tests.id,
                    tests.title,
                    tests.subject_id,
                    tests.is_active,
                    tests.created_at,
                    teacher_tests.id AS teacher_test_id,
                    tests.created_by
            `,
            [teacherId, teacherTestId, title, isActive],
        )

        return rows[0]
    },

    async updateTeacherTestGroups({ teacherId, teacherTestId, groupIds }) {
        const { rows: teacherTests } = await db.query(
            `
                SELECT id
                FROM teacher_tests
                WHERE id = $1
                    AND teacher_id = $2
                LIMIT 1
            `,
            [teacherTestId, teacherId],
        )

        if (!teacherTests[0]) {
            return null
        }

        await db.query(
            `
                DELETE FROM teacher_test_groups
                WHERE teacher_tests = $1
            `,
            [teacherTestId],
        )

        if (groupIds.length) {
            await db.query(
                `
                    INSERT INTO teacher_test_groups (
                        teacher_tests,
                        group_id
                    )
                    SELECT $1, subject_groups.group_id
                    FROM subject_groups
                    JOIN teacher_tests
                        ON teacher_tests.id = $1
                    JOIN tests
                        ON tests.id = teacher_tests.test_id
                    WHERE subject_groups.subject_id = tests.subject_id
                        AND subject_groups.group_id = ANY($2::BIGINT[])
                `,
                [teacherTestId, groupIds],
            )
        }

        return { id: teacherTestId }
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

    async deleteTeacherTest(testId, teacherId) {
        const result = await db.query(
            `
        UPDATE tests
        SET deleted_at = now()
        WHERE id = $1
          AND created_by = $2
          AND deleted_at IS NULL
        RETURNING id
        `,
            [testId, teacherId],
        )

        return result.rows[0]
    }
}
