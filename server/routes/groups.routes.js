import { Router } from 'express'

import { groupsController } from '../features/groups/groups.controller.js'

export const groupsRouter = Router()

groupsRouter.get('/', groupsController.getGroups)
groupsRouter.post('/', groupsController.createGroup)
groupsRouter.delete('/:id', groupsController.deleteGroup)