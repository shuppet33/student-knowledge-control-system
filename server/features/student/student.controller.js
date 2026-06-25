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
                    title: row.test_title,
                    createdAt: row.test_created_at,
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
}
