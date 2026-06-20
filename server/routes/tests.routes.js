import { Router } from 'express'

import { testsController } from '../features/tests/tests.controller.js'

export const testsRouter = Router()

testsRouter.get('/', testsController.getTests)
testsRouter.delete('/:id', testsController.deleteTest)
