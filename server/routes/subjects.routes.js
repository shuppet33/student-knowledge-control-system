import { Router } from 'express'

import { subjectsController } from '../features/subjects/subjects.controller.js'

export const subjectsRouter = Router()

subjectsRouter.get('/', subjectsController.getSubjects)
subjectsRouter.post('/', subjectsController.createSubject)
subjectsRouter.get('/:id', subjectsController.getSubject)
subjectsRouter.patch('/:id', subjectsController.updateSubject)
subjectsRouter.get('/:id/groups', subjectsController.getSubjectGroups)
subjectsRouter.get('/:id/teachers', subjectsController.getSubjectTeachers)
subjectsRouter.delete('/:id', subjectsController.deleteSubject)
