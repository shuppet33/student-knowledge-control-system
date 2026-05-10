import { teachersModel } from './teachers.model.js'

export const teachersController = {
    async getTeachers(req, res) {
        try {
            const teachers = await teachersModel.getTeachers()

            return res.json(teachers)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения преподавателей',
            })
        }
    },
}