import { Router } from 'express'

import { teachersController } from '../features/teachers/teachers.controller.js'

export const teachersRouter = Router()

teachersRouter.get('/', teachersController.getTeachers)