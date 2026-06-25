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

            const normalizedName = name.trim()

            if (!normalizedName) {
                return res.status(400).json({
                    message: 'Название предмета не может быть пустым',
                })
            }

            const existingSubject =
                await subjectsModel.getSubjectByName(normalizedName)

            if (existingSubject) {
                return res.status(409).json({
                    message: 'Предмет с таким названием уже существует',
                })
            }

            const subject =
                await subjectsModel.createSubject(normalizedName)

            return res.status(201).json(subject)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка создания предмета',
            })
        }
    },
    async getSubject(req, res) {
        try {
            const subject = await subjectsModel.getSubjectById(req.params.id)

            if (!subject) {
                return res.status(404).json({
                    message: 'Предмет не найден',
                })
            }

            return res.json(subject)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения предмета',
            })
        }
    },
    async updateSubject(req, res) {
        try {
            const name = req.body.name?.trim()

            if (!name) {
                return res.status(400).json({
                    message: 'Название предмета обязательно',
                })
            }

            const subject = await subjectsModel.updateSubjectName({
                id: req.params.id,
                name,
            })

            if (!subject) {
                return res.status(404).json({
                    message: 'Предмет не найден',
                })
            }

            return res.json(subject)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка обновления предмета',
            })
        }
    },
    async getSubjectGroups(req, res) {
        try {
            const subject = await subjectsModel.getSubjectById(req.params.id)

            if (!subject) {
                return res.status(404).json({
                    message: 'Предмет не найден',
                })
            }

            const groups = await subjectsModel.getSubjectGroups(req.params.id)

            return res.json(groups)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения групп предмета',
            })
        }
    },
    async getSubjectTeachers(req, res) {
        try {
            const subject = await subjectsModel.getSubjectById(req.params.id)

            if (!subject) {
                return res.status(404).json({
                    message: 'Предмет не найден',
                })
            }

            const teachers =
                await subjectsModel.getSubjectTeachers(req.params.id)

            return res.json(teachers)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения преподавателей предмета',
            })
        }
    },
    async deleteSubject(req, res) {
        try {
            const { id } = req.params

            const subject = await subjectsModel.deleteSubject(id)

            if (!subject) {
                return res.status(404).json({
                    message: 'Предмет не найден',
                })
            }

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
