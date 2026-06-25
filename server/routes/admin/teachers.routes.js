import { Router } from 'express'

import { teachersController } from '../../features/admin/teachers/teachers.controller.js'

export const teachersRouter = Router()

teachersRouter.get('/', teachersController.getTeachers)

teachersRouter.get('/:id/subjects', teachersController.getTeacherSubjects)
teachersRouter.get(
    '/:teacherId/subjects/:subjectId/tests',
    teachersController.getTeacherSubjectTests,
)

teachersRouter.post('/:id/subjects', teachersController.addSubjectToTeacher)

teachersRouter.delete(
    '/:teacherId/subjects/:subjectId',
    teachersController.removeSubjectFromTeacher,
)
