import { subjectsModel } from './subjects.model.js'

export const subjectsController = {
    async getSubjects(req, res) {
        try {
            const subjects = await subjectsModel.getSubjects()

            return res.json(subjects)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения предметов',
            })
        }
    },
    async createSubject(req, res) {
        try {
            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    message: 'Название предмета обязательно',
                })
            }

            const subject = await subjectsModel.createSubject(name)

            return res.status(201).json(subject)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка создания предмета',
            })
        }
    },
    async deleteSubject(req, res) {
        try {
            const { id } = req.params

            await subjectsModel.deleteSubject(id)

            return res.json({
                message: 'Предмет удален',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка удаления предмета',
            })
        }
    },
}