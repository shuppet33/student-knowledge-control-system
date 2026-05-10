import { Router } from 'express'

import { subjectsController } from '../features/subjects/subjects.controller.js'

export const subjectsRouter = Router()

subjectsRouter.get('/', subjectsController.getSubjects)
subjectsRouter.post('/', subjectsController.createSubject)
subjectsRouter.delete('/:id', subjectsController.deleteSubject)