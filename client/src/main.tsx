import { createCtx } from '@reatom/framework'
import { reatomContext } from '@reatom/npm-react'

import { createRoot } from 'react-dom/client'

import { App } from './app.tsx'

import '$shared/style/reset.css'

const ctx = createCtx()

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
    <reatomContext.Provider value={ctx}>
        <App />
    </reatomContext.Provider>,
)
