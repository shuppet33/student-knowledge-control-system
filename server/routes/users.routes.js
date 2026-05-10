import { Router } from 'express'

import { usersController } from '../features/users/users.controller.js'

export const usersRouter = Router()

usersRouter.get('/', usersController.getUsers)
usersRouter.post('/', usersController.createUser)
usersRouter.delete('/:id', usersController.deleteUser)