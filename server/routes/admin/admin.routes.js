import { Router } from 'express'

import {
    authMiddleware,
    requireRole,
} from '../../middleware/auth.middleware.js'

import { groupsRouter } from './groups.routes.js'
import { studentsRouter } from './students.routes.js'
import { subjectsRouter } from './subjects.routes.js'
import { teachersRouter } from './teachers.routes.js'
import { testsRouter } from './tests.routes.js'
import { usersRouter } from './users.routes.js'

export const adminRouter = Router()

adminRouter.use(authMiddleware, requireRole('admin'))

adminRouter.use('/users', usersRouter)
adminRouter.use('/groups', groupsRouter)
adminRouter.use('/students', studentsRouter)
adminRouter.use('/subjects', subjectsRouter)
adminRouter.use('/teachers', teachersRouter)
adminRouter.use('/tests', testsRouter)
