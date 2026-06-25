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

            const normalizedName = name.trim()

            if (!normalizedName) {
                return res.status(400).json({
                    message: 'Название группы не может быть пустым',
                })
            }

            const existingGroup =
                await groupsModel.getGroupByName(normalizedName)

            if (existingGroup) {
                return res.status(409).json({
                    message: 'Группа с таким названием уже существует',
                })
            }

            const group = await groupsModel.createGroup(normalizedName)

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

            const group = await groupsModel.deleteGroup(id)

            if (!group) {
                return res.status(404).json({
                    message: 'Группа не найдена',
                })
            }

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

    async addStudent(req, res) {
        try {
            const { groupId } = req.params
            const { student_ids } = req.body

            if (!Array.isArray(student_ids) || student_ids.length === 0) {
                return res.status(400).json({
                    message: 'student_ids обязателен',
                })
            }

            const [group, students] = await Promise.all([
                groupsModel.getGroupById(groupId),
                groupsModel.getStudentsByIds(student_ids),
            ])

            if (!group) {
                return res.status(404).json({
                    message: 'Группа не найдена',
                })
            }

            if (students?.length !== student_ids.length) {
                return res.status(404).json({
                    message: 'Один или несколько студентов не найдены',
                })
            }

            const result = await groupsModel.addStudents({
                groupId,
                studentIds: student_ids,
            })

            return res.status(201).json(result)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка добавления студента в группу',
            })
        }
    },

    async removeStudent(req, res) {
        try {
            const { groupId, studentId } = req.params

            const result = await groupsModel.removeStudent({
                groupId,
                studentId,
            })

            if (!result) {
                return res.status(404).json({
                    message: 'Студент не найден в группе',
                })
            }

            return res.json({
                message: 'Студент удалён из группы',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка удаления студента из группы',
            })
        }
    },

    async getGroupSubjects(req, res) {
        try {
            const { groupId } = req.params
            const group = await groupsModel.getGroupById(groupId)

            if (!group) {
                return res.status(404).json({
                    message: 'Группа не найдена',
                })
            }

            const subjects = await groupsModel.getGroupSubjects(groupId)

            return res.json(subjects)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения предметов группы',
            })
        }
    },

    async addSubject(req, res) {
        try {
            const { groupId } = req.params
            const { subject_id } = req.body

            if (!subject_id) {
                return res.status(400).json({
                    message: 'subject_id обязателен',
                })
            }

            const [group, subject, existingRelation] = await Promise.all([
                groupsModel.getGroupById(groupId),
                groupsModel.getSubjectById(subject_id),
                groupsModel.getSubjectGroupRelation({
                    groupId,
                    subjectId: subject_id,
                }),
            ])

            if (!group) {
                return res.status(404).json({
                    message: 'Группа не найдена',
                })
            }

            if (!subject) {
                return res.status(404).json({
                    message: 'Предмет не найден',
                })
            }

            if (existingRelation) {
                return res.status(409).json({
                    message: 'Предмет уже назначен группе',
                })
            }

            const relation = await groupsModel.addSubject({
                groupId,
                subjectId: subject_id,
            })

            return res.status(201).json(relation)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка назначения предмета группе',
            })
        }
    },

    async removeSubject(req, res) {
        try {
            const { groupId, subjectId } = req.params
            const relation = await groupsModel.removeSubject({
                groupId,
                subjectId,
            })

            if (!relation) {
                return res.status(404).json({
                    message: 'Предмет не назначен этой группе',
                })
            }

            return res.json({
                message: 'Предмет отвязан от группы',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка удаления предмета у группы',
            })
        }
    },
}
