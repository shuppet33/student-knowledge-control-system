import { themeAtom } from "$entities/theme.ts";
import {reatomComponent} from "@reatom/react";
import {ConfigProvider, theme as antdTheme} from "antd";
import type {FC, ReactNode} from "react";

export const App:FC<{children: ReactNode}> = reatomComponent(({children}) => {
    const theme = themeAtom()

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    theme === 'dark'
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    )
})