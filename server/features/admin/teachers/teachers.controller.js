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

    async getTeacherSubjects(req, res) {
        try {
            const { id } = req.params

            const subjects = await teachersModel.getTeacherSubjects(id)

            return res.json(subjects)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения предметов преподавателя',
            })
        }
    },

    async getTeacherSubjectTests(req, res) {
        try {
            const {
                teacherId,
                subjectId,
            } = req.params

            const tests =
                await teachersModel.getTeacherSubjectTests({
                    teacher_id: teacherId,
                    subject_id: subjectId,
                })

            return res.json(tests)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения тестов преподавателя',
            })
        }
    },

    async addSubjectToTeacher(req, res) {
        try {
            const { id } = req.params
            const { subject_id } = req.body

            if (!subject_id) {
                return res.status(400).json({
                    message: 'subject_id обязателен',
                })
            }

            const [teacher, subject, existingRelation] = await Promise.all([
                teachersModel.getTeacherById(id),
                teachersModel.getSubjectById(subject_id),
                teachersModel.getTeacherSubjectRelation({
                    teacher_id: id,
                    subject_id,
                }),
            ])

            if (!teacher) {
                return res.status(404).json({
                    message: 'Активный пользователь с ролью teacher не найден',
                })
            }

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

            const teacherSubject = await teachersModel.addSubjectToTeacher({
                teacher_id: id,
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

    async removeSubjectFromTeacher(req, res) {
        try {
            const { teacherId, subjectId } = req.params

            const relation = await teachersModel.removeSubjectFromTeacher({
                teacher_id: teacherId,
                subject_id: subjectId,
            })

            if (!relation) {
                return res.status(404).json({
                    message: 'Предмет не назначен этому преподавателю',
                })
            }

            return res.json({
                message: 'Предмет отвязан от преподавателя',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка удаления предмета преподавателя',
            })
        }
    },
}
