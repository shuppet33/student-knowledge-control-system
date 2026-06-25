import { Router } from 'express'

import { studentController } from '../../features/student/student.controller.js'
import { authMiddleware, requireRole } from '../../middleware/auth.middleware.js'

export const studentRouter = Router()

studentRouter.use(authMiddleware, requireRole('student'))

studentRouter.get('/subjects', studentController.getMySubjects)

studentRouter.get(
    '/subjects/:subjectId/tests',
    studentController.getSubjectTests,
)
