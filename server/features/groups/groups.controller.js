import { groupsModel } from './groups.model.js'

export const groupsController = {
    async getGroups(req, res) {
        try {
            const groups = await groupsModel.getGroups()

            return res.json(groups)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения групп',
            })
        }
    },

    async createGroup(req, res) {
        try {
            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    message: 'Название группы обязательно',
                })
            }

            const group = await groupsModel.createGroup(name)

            return res.status(201).json(group)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка создания группы',
            })
        }
    },

    async deleteGroup(req, res) {
        try {
            const { id } = req.params

            await groupsModel.deleteGroup(id)

            return res.json({
                message: 'Группа удалена',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка удаления группы',
            })
        }
    },
}