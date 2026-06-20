import { Router } from 'express'

import { studentsController } from '../features/students/students.controller.js'

export const studentsRouter = Router()

studentsRouter.get('/', studentsController.getStudents)
