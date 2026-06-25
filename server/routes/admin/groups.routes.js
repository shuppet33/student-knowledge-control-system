import { Router } from 'express'

import { groupsController } from '../../features/admin/groups/groups.controller.js'

export const groupsRouter = Router()

groupsRouter.get('/', groupsController.getGroups)
groupsRouter.post('/', groupsController.createGroup)
groupsRouter.delete('/:id', groupsController.deleteGroup)

groupsRouter.post('/:groupId/students', groupsController.addStudent)
groupsRouter.delete(
    '/:groupId/students/:studentId',
    groupsController.removeStudent,
)

groupsRouter.get('/:groupId/subjects', groupsController.getGroupSubjects)
groupsRouter.post('/:groupId/subjects', groupsController.addSubject)
groupsRouter.delete(
    '/:groupId/subjects/:subjectId',
    groupsController.removeSubject,
)
