import {Layout as LayoutAntd} from 'antd'
import type {FC, ReactNode} from "react";

export const Layout: FC<{children: ReactNode}> = ({children}) => {
    return(
        <>
            <LayoutAntd style={{height:'100vh'}}>
                {children}
            </LayoutAntd>
        </>
    )
}