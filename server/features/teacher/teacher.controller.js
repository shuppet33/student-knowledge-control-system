import { teacherModel } from './teacher.model.js'

export const teacherController = {
    async getMySubjects(req, res) {
        try {
            const subjects = await teacherModel.getSubjectsByUserId(req.user.id)

            return res.status(200).json(subjects)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка при получении предметов преподавателя',
            })
        }
    },

    async getSubjects(req, res) {
        try {
            const subjects = await teacherModel.getSubjects()

            return res.status(200).json(subjects)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка при получении предметов',
            })
        }
    },

    async getSubject(req, res) {
        try {
            const { subjectId } = req.params

            const [subject, relation] = await Promise.all([
                teacherModel.getSubjectById(subjectId),
                teacherModel.getTeacherSubjectRelation({
                    teacher_id: req.user.id,
                    subject_id: subjectId,
                }),
            ])

            if (!subject || !relation) {
                return res.status(404).json({
                    message: 'Предмет не найден или не назначен преподавателю',
                })
            }

            return res.status(200).json(subject)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка при получении предмета',
            })
        }
    },

    async updateSubject(req, res) {
        try {
            const { subjectId } = req.params
            const name = req.body.name?.trim()

            if (!name) {
                return res.status(400).json({
                    message: 'Название предмета обязательно',
                })
            }

            const relation = await teacherModel.getTeacherSubjectRelation({
                teacher_id: req.user.id,
                subject_id: subjectId,
            })

            if (!relation) {
                return res.status(404).json({
                    message: 'Предмет не найден или не назначен преподавателю',
                })
            }

            const subject = await teacherModel.updateSubjectName({
                id: subjectId,
                name,
            })

            if (!subject) {
                return res.status(404).json({
                    message: 'Предмет не найден',
                })
            }

            return res.status(200).json(subject)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка обновления предмета',
            })
        }
    },

    async getGroups(req, res) {
        try {
            const groups = await teacherModel.getGroups()

            return res.status(200).json(groups)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения групп',
            })
        }
    },

    async getSubjectGroups(req, res) {
        try {
            const { subjectId } = req.params

            const relation = await teacherModel.getTeacherSubjectRelation({
                teacher_id: req.user.id,
                subject_id: subjectId,
            })

            if (!relation) {
                return res.status(404).json({
                    message: 'Предмет не найден или не назначен преподавателю',
                })
            }

            const groups = await teacherModel.getSubjectGroups(subjectId)

            return res.status(200).json(groups)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения групп предмета',
            })
        }
    },

    async addSubjectToGroup(req, res) {
        try {
            const { groupId } = req.params
            const { subject_id } = req.body

            if (!subject_id) {
                return res.status(400).json({
                    message: 'subject_id обязателен',
                })
            }

            const [
                group,
                subjectRelation,
                existingRelation,
            ] = await Promise.all([
                teacherModel.getGroupById(groupId),
                teacherModel.getTeacherSubjectRelation({
                    teacher_id: req.user.id,
                    subject_id,
                }),
                teacherModel.getSubjectGroupRelation({
                    groupId,
                    subjectId: subject_id,
                }),
            ])

            if (!group) {
                return res.status(404).json({
                    message: 'Группа не найдена',
                })
            }

            if (!subjectRelation) {
                return res.status(404).json({
                    message: 'Предмет не найден или не назначен преподавателю',
                })
            }

            if (existingRelation) {
                return res.status(409).json({
                    message: 'Предмет уже назначен группе',
                })
            }

            const relation = await teacherModel.addSubjectToGroup({
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

    async removeSubjectFromGroup(req, res) {
        try {
            const { groupId, subjectId } = req.params

            const subjectRelation =
                await teacherModel.getTeacherSubjectRelation({
                    teacher_id: req.user.id,
                    subject_id: subjectId,
                })

            if (!subjectRelation) {
                return res.status(404).json({
                    message: 'Предмет не найден или не назначен преподавателю',
                })
            }

            const relation = await teacherModel.removeSubjectFromGroup({
                groupId,
                subjectId,
            })

            if (!relation) {
                return res.status(404).json({
                    message: 'Предмет не назначен этой группе',
                })
            }

            return res.status(200).json({
                message: 'Предмет отвязан от группы',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка удаления группы из предмета',
            })
        }
    },

    async addSubject(req, res) {
        try {
            const { subject_id } = req.body

            if (!subject_id) {
                return res.status(400).json({
                    message: 'subject_id обязателен',
                })
            }

            const [subject, existingRelation] = await Promise.all([
                teacherModel.getSubjectById(subject_id),
                teacherModel.getTeacherSubjectRelation({
                    teacher_id: req.user.id,
                    subject_id,
                }),
            ])

            if (!subject) {
                return res.status(404).json({
                    message: 'Предмет не найден',
                })
            }

            if (existingRelation) {
                return res.status(409).json({
                    message: 'Предмет уже назначен преподавателю',
                })
            }

            const teacherSubject = await teacherModel.addSubjectToTeacher({
                teacher_id: req.user.id,
                subject_id,
            })

            return res.status(201).json(teacherSubject)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка назначения предмета преподавателю',
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
                await teacherModel.getSubjectByName(normalizedName)

            if (existingSubject) {
                return res.status(409).json({
                    message: 'Предмет с таким названием уже существует',
                })
            }

            const subject = await teacherModel.createSubject(normalizedName)

            await teacherModel.addSubjectToTeacher({
                teacher_id: req.user.id,
                subject_id: subject.id,
            })

            return res.status(201).json(subject)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка создания предмета',
            })
        }
    },
}
