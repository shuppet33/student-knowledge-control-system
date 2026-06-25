import { Router } from 'express'

import { testsController } from '../../features/admin/tests/tests.controller.js'

export const testsRouter = Router()

testsRouter.get('/', testsController.getTests)
testsRouter.delete('/:id', testsController.deleteTest)
