import {MoonOutlined, SunOutlined} from "@ant-design/icons";
import { reatomComponent } from "@reatom/npm-react";
import {useEffect} from "react";
import {themeAtom} from "../../entities/theme.ts";
import {Switch} from "antd";

export const ThemeSwitcher = reatomComponent(({ctx}) => {
    const theme =ctx.spy(themeAtom)

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <Switch
            checked={theme === 'dark'}
            onChange={(checked) =>
                themeAtom(ctx, checked ? 'dark' : 'light')
            }
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
        />
    )
})
