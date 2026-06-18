import { ConfigProvider, theme as antdTheme } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { BrowserRouter } from 'react-router'

import { sessionResource } from '$modules/auth'
import { themeAtom } from '$modules/theme'

import { AppRouter } from './router/router.view'

export const App = reatomComponent(({ ctx }) => {
    const theme = ctx.spy(themeAtom)

    ctx.spy(sessionResource.statusesAtom)

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    theme === 'dark'
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
            }}
        >
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ConfigProvider>
    )
})
