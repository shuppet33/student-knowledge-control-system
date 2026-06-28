import { studentModel } from './student.model.js'

export const studentController = {
    async getMySubjects(req, res) {
        try {
            const subjects = await studentModel.getSubjectsByUserId(req.user.id)

            return res.status(200).json(subjects)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка при получении предметов студента',
            })
        }
    },
    async getSubjectTests(req, res) {
        try {
            const { subjectId } = req.params

            const rows = await studentModel.getSubjectTestsByUserId(
                req.user.id,
                subjectId,
            )

            if (!rows.length) {
                return res.status(404).json({
                    message: 'Предмет не найден или не назначен вашей группе',
                })
            }

            const subject = {
                id: rows[0].subject_id,
                name: rows[0].subject_name,
            }

            const tests = rows
                .filter((row) => row.test_id)
                .map((row) => ({
                    id: row.test_id,
                    teacher_test_id: row.teacher_test_id,
                    title: row.test_title,
                    questions_count: row.questions_count,
                    answers_count: row.answers_count,
                    score: row.score,
                    date_of_appointment: row.date_of_appointment,
                }))

            return res.status(200).json({
                subject,
                tests,
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка при получении тестов предмета',
            })
        }
    },

    async startTest(req, res) {
        try {
            const { testId } = req.params

            const test = await studentModel.getAvailableTest({
                userId: req.user.id,
                testId,
            })

            if (!test) {
                return res.status(404).json({
                    message: 'Тест не найден или недоступен',
                })
            }

            const completedAttempt = await studentModel.getCompletedAttempt({
                userId: req.user.id,
                teacherTestId: test.teacher_test_id,
            })

            if (completedAttempt) {
                return res.status(409).json({
                    message: 'Тест уже пройден',
                })
            }

            await studentModel.finishActiveAttempts({
                userId: req.user.id,
            })

            const finishedAttempt = await studentModel.getCompletedAttempt({
                userId: req.user.id,
                teacherTestId: test.teacher_test_id,
            })

            if (finishedAttempt) {
                return res.status(409).json({
                    message: 'Тест уже пройден',
                })
            }

            const activeAttempt = await studentModel.getActiveAttempt({
                userId: req.user.id,
                teacherTestId: test.teacher_test_id,
            })
            const attempt = activeAttempt ?? await studentModel.createAttempt({
                userId: req.user.id,
                teacherTestId: test.teacher_test_id,
                testVersionId: test.test_version_id,
            })
            const questions = await studentModel.getTestQuestions({
                testVersionId: test.test_version_id,
                attemptId: attempt.id,
            })

            return res.status(200).json({
                attempt_id: attempt.id,
                test: {
                    id: test.test_id,
                    teacher_test_id: test.teacher_test_id,
                    title: test.title,
                },
                questions,
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка запуска теста',
            })
        }
    },

    async saveAnswer(req, res) {
        try {
            const { attemptId } = req.params
            const { question_id, answer_id, is_selected } = req.body

            const answer = await studentModel.saveAnswer({
                userId: req.user.id,
                attemptId,
                questionId: question_id,
                answerId: answer_id,
                isSelected: is_selected ?? true,
            })

            if (!answer) {
                return res.status(404).json({
                    message: 'Попытка, вопрос или ответ не найдены',
                })
            }

            return res.status(200).json({
                message: 'Ответ сохранён',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка сохранения ответа',
            })
        }
    },

    async finishAttempt(req, res) {
        try {
            const { attemptId } = req.params

            const attempt = await studentModel.finishAttempt({
                userId: req.user.id,
                attemptId,
            })

            if (!attempt) {
                return res.status(404).json({
                    message: 'Попытка не найдена или уже завершена',
                })
            }

            return res.status(200).json(attempt)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка завершения теста',
            })
        }
    },
}
