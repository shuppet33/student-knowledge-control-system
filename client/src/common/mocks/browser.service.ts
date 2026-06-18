import { setupWorker } from 'msw/browser'

import { apiHandlers } from './api.handlers'

export const mockWorker = setupWorker(...apiHandlers)
