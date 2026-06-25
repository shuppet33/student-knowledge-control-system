import { studentsModel } from './students.model.js'

export const studentsController = {
    async searchStudents(req, res) {
        try {
            const {
                search = '',
                excluded_group_id = null,
                limit = 50,
            } = req.query
            const normalizedLimit = Math.min(Number(limit) || 50, 50)

            const students = await studentsModel.searchStudents({
                search,
                excludedGroupId: excluded_group_id,
                limit: normalizedLimit,
            })

            return res.json(students)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка поиска студентов',
            })
        }
    },

    async getStudents(req, res) {
        try {
            const students = await studentsModel.getStudents()

            return res.json(students)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения студентов',
            })
        }
    },
}
