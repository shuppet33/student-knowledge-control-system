import { reatomComponent } from "@reatom/react"
import {Switch} from "antd";
import {themeAtom} from "$entities/theme.ts";
import {MoonOutlined, SunOutlined} from "@ant-design/icons";
import {useEffect} from "react";

export const ThemeSwitcher = reatomComponent(() => {
    const theme = themeAtom()

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <Switch
            checked={theme === 'dark'}
            onChange={(checked) =>
                themeAtom.set(checked ? 'dark' : 'light')
            }
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
        />
    )
})
