import { createCtx } from '@reatom/framework'
import { reatomContext } from '@reatom/npm-react'

import { createRoot } from 'react-dom/client'

import { configureAppApiClient } from './api/api-client.config'
import { App } from './app.view'

import '$common/styles/reset.css'

const ctx = createCtx()
const rootElement = document.getElementById('root')!

configureAppApiClient(ctx)

const enableMocks = async () => {
    if (import.meta.env.VITE_ENABLE_MOCKS !== 'true') {
        return
    }

    const { mockWorker } = await import(
        '$common/mocks/browser.service'
    )

    await mockWorker.start({
        onUnhandledRequest: 'bypass',
    })
}

enableMocks().then(() => {
    createRoot(rootElement).render(
        <reatomContext.Provider value={ctx}>
            <App />
        </reatomContext.Provider>,
    )
})
