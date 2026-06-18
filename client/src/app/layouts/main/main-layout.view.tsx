import { Layout as AntdLayout } from 'antd'

import type { FC } from 'react'

import type { MainLayoutProps } from './main-layout.types'

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return <AntdLayout style={{ minHeight: '100vh' }}>{children}</AntdLayout>
}
