import { db } from '../../db/connect.js'

export const studentModel = {
    async getSubjectsByUserId(userId) {
        const { rows } = await db.query(
            `
                WITH student_subjects AS (
                    SELECT DISTINCT
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
                ),
                available_tests AS (
                    SELECT DISTINCT
                        s.id AS subject_id,
                        tt.id AS teacher_test_id
                    FROM student_groups stg
                    JOIN subject_groups subg
                        ON subg.group_id = stg.group_id
                    JOIN subjects s
                        ON s.id = subg.subject_id
                    JOIN teacher_test_groups ttg
                        ON ttg.group_id = stg.group_id
                    JOIN teacher_tests tt
                        ON tt.id = ttg.teacher_tests
                    JOIN tests t
                        ON t.id = tt.test_id
                        AND t.subject_id = s.id
                    WHERE stg.student_id = $1
                        AND s.deleted_at IS NULL
                        AND t.deleted_at IS NULL
                        AND t.is_active = TRUE
                ),
                best_attempts AS (
                    SELECT
                        teacher_test_id,
                        MAX(score) AS score
                    FROM test_attempts
                    WHERE student_id = $1
                        AND status = 'completed'
                    GROUP BY teacher_test_id
                )
                SELECT
                    ss.id,
                    ss.name,
                    ROUND(AVG(ba.score)::NUMERIC, 2)::FLOAT AS average_score,
                    COUNT(ba.teacher_test_id)::INT AS passed_tests_count,
                    COUNT(at.teacher_test_id)::INT AS total_tests_count
                FROM student_subjects ss
                LEFT JOIN available_tests at
                    ON at.subject_id = ss.id
                LEFT JOIN best_attempts ba
                    ON ba.teacher_test_id = at.teacher_test_id
                GROUP BY ss.id, ss.name
                ORDER BY ss.name
            `,
            [userId],
        )

        return rows
    },

    async getSubjectTestsByUserId(userId, subjectId) {
        const { rows } = await db.query(
            `
                WITH available_tests AS (
                    SELECT DISTINCT
                        s.id AS subject_id,
                        s.name AS subject_name,
                        tt.id AS teacher_test_id,
                        t.id AS test_id,
                        t.title AS test_title,
                        t.created_at AS test_created_at,
                        tv.id AS test_version_id
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
                        AND t.deleted_at IS NULL
                        AND t.is_active = TRUE
                    LEFT JOIN test_versions tv
                        ON tv.test_id = t.id
                        AND tv.is_active = TRUE
                    WHERE stg.student_id = $1
                        AND s.id = $2
                        AND s.deleted_at IS NULL
                ),
                best_attempts AS (
                    SELECT DISTINCT ON (teacher_test_id)
                        id,
                        teacher_test_id,
                        score,
                        finished_at,
                        test_version_id
                    FROM test_attempts
                    WHERE student_id = $1
                        AND status = 'completed'
                    ORDER BY teacher_test_id, score DESC, finished_at DESC
                ),
                question_counts AS (
                    SELECT
                        q.test_version_id,
                        COUNT(q.id)::INT AS questions_count
                    FROM questions q
                    WHERE q.deleted_at IS NULL
                    GROUP BY q.test_version_id
                ),
                correct_answer_counts AS (
                    SELECT
                        sa.attempt_id,
                        COUNT(DISTINCT sa.question_id)::INT AS answers_count
                    FROM student_answers sa
                    WHERE sa.is_correct = TRUE
                    GROUP BY sa.attempt_id
                )
                SELECT
                    at.subject_id,
                    at.subject_name,

                    at.test_id,
                    at.teacher_test_id,
                    at.test_title,
                    at.test_created_at,
                    COALESCE(qc.questions_count, 0) AS questions_count,
                    COALESCE(cac.answers_count, 0) AS answers_count,
                    ba.score,
                    at.test_created_at AS date_of_appointment
                FROM available_tests at
                LEFT JOIN best_attempts ba
                    ON ba.teacher_test_id = at.teacher_test_id
                LEFT JOIN test_attempts ta
                    ON ta.id = ba.id
                LEFT JOIN question_counts qc
                    ON qc.test_version_id = COALESCE(
                        ba.test_version_id,
                        at.test_version_id
                    )
                LEFT JOIN correct_answer_counts cac
                    ON cac.attempt_id = ta.id
                ORDER BY at.test_created_at DESC
            `,
            [userId, subjectId],
        )

        return rows
    },

    async getAvailableTest({ userId, testId }) {
        const { rows } = await db.query(
            `
                SELECT DISTINCT
                    tt.id AS teacher_test_id,
                    t.id AS test_id,
                    t.title,
                    tv.id AS test_version_id
                FROM student_groups stg
                JOIN teacher_test_groups ttg
                    ON ttg.group_id = stg.group_id
                JOIN teacher_tests tt
                    ON tt.id = ttg.teacher_tests
                JOIN tests t
                    ON t.id = tt.test_id
                JOIN test_versions tv
                    ON tv.test_id = t.id
                    AND tv.is_active = TRUE
                WHERE stg.student_id = $1
                    AND t.id = $2
                    AND t.deleted_at IS NULL
                    AND t.is_active = TRUE
                LIMIT 1
            `,
            [userId, testId],
        )

        return rows[0]
    },

    async getActiveAttempt({ userId, teacherTestId }) {
        const { rows } = await db.query(
            `
                SELECT id
                FROM test_attempts
                WHERE student_id = $1
                    AND teacher_test_id = $2
                    AND status = 'in_progress'
                ORDER BY started_at DESC
                LIMIT 1
            `,
            [userId, teacherTestId],
        )

        return rows[0]
    },

    async createAttempt({ userId, teacherTestId, testVersionId }) {
        const { rows } = await db.query(
            `
                INSERT INTO test_attempts (
                    student_id,
                    teacher_test_id,
                    test_version_id,
                    status
                )
                VALUES ($1, $2, $3, 'in_progress')
                RETURNING id
            `,
            [userId, teacherTestId, testVersionId],
        )

        return rows[0]
    },

    async getTestQuestions({ testVersionId, attemptId }) {
        const { rows } = await db.query(
            `
                SELECT
                    q.id,
                    q.text,
                    q.type,
                    q.position,
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', a.id,
                            'text', a.text,
                            'is_selected', sa.id IS NOT NULL
                        )
                        ORDER BY a.id
                    ) AS answers
                FROM questions q
                JOIN answers a
                    ON a.question_id = q.id
                LEFT JOIN student_answers sa
                    ON sa.question_id = q.id
                    AND sa.answer_id = a.id
                    AND sa.attempt_id = $2
                WHERE q.test_version_id = $1
                    AND q.deleted_at IS NULL
                GROUP BY q.id, q.text, q.type, q.position
                ORDER BY q.position ASC
            `,
            [testVersionId, attemptId],
        )

        return rows
    },

    async saveAnswer({ userId, attemptId, questionId, answerId }) {
        const client = await db.connect()

        try {
            await client.query('BEGIN')

            const { rows: attempts } = await client.query(
                `
                    SELECT id
                    FROM test_attempts
                    WHERE id = $1
                        AND student_id = $2
                        AND status = 'in_progress'
                    LIMIT 1
                `,
                [attemptId, userId],
            )

            if (!attempts[0]) {
                await client.query('ROLLBACK')
                return null
            }

            const { rows: answers } = await client.query(
                `
                    SELECT is_correct
                    FROM answers
                    WHERE id = $1
                        AND question_id = $2
                    LIMIT 1
                `,
                [answerId, questionId],
            )

            if (!answers[0]) {
                await client.query('ROLLBACK')
                return null
            }

            await client.query(
                `
                    DELETE FROM student_answers
                    WHERE attempt_id = $1
                        AND question_id = $2
                `,
                [attemptId, questionId],
            )

            const { rows } = await client.query(
                `
                    INSERT INTO student_answers (
                        attempt_id,
                        question_id,
                        answer_id,
                        is_correct
                    )
                    VALUES ($1, $2, $3, $4)
                    RETURNING id
                `,
                [attemptId, questionId, answerId, answers[0].is_correct],
            )

            await client.query('COMMIT')

            return rows[0]
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    },
}
