import { studentsModel } from './students.model.js'

export const studentsController = {
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
