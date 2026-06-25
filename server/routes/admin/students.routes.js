import { Router } from 'express'

import { studentsController } from '../../features/admin/students/students.controller.js'

export const studentsRouter = Router()

studentsRouter.get('/search', studentsController.searchStudents)
studentsRouter.get('/', studentsController.getStudents)
