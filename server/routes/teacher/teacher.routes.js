import { Router } from 'express'

import { teacherController } from '../../features/teacher/teacher.controller.js'
import { authMiddleware, requireRole } from '../../middleware/auth.middleware.js'

export const teacherRouter = Router()

teacherRouter.use(authMiddleware, requireRole('teacher'))

teacherRouter.get('/groups', teacherController.getGroups)
teacherRouter.post('/groups/:groupId/subjects', teacherController.addSubjectToGroup)
teacherRouter.delete(
    '/groups/:groupId/subjects/:subjectId',
    teacherController.removeSubjectFromGroup,
)

teacherRouter.get('/subjects', teacherController.getMySubjects)
teacherRouter.get('/subjects/all', teacherController.getSubjects)
teacherRouter.get('/subjects/:subjectId', teacherController.getSubject)
teacherRouter.patch('/subjects/:subjectId', teacherController.updateSubject)
teacherRouter.get('/subjects/:subjectId/groups', teacherController.getSubjectGroups)
teacherRouter.get('/subjects/:subjectId/tests', teacherController.getSubjectTests)
teacherRouter.post('/subjects/:subjectId/tests', teacherController.createTeacherTest)
teacherRouter.post('/subjects', teacherController.addSubject)
teacherRouter.post('/subjects/create', teacherController.createSubject)

teacherRouter.get('/tests/:teacherTestId', teacherController.getTeacherTest)
teacherRouter.put(
    '/tests/:teacherTestId/questions',
    teacherController.updateTeacherTestQuestions,
)
teacherRouter.patch('/tests/:teacherTestId', teacherController.updateTeacherTest)
teacherRouter.put(
    '/tests/:teacherTestId/groups',
    teacherController.updateTeacherTestGroups,
)

teacherRouter.delete('/tests/:testId', teacherController.deleteTeacherTest)