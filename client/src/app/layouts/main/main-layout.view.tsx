import { Layout as AntdLayout } from 'antd'

import type { FC } from 'react'

import type { MainLayoutProps } from './main-layout.types'

import styles from './main-layout.module.css'

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return <AntdLayout className={styles.layout}>{children}</AntdLayout>
}
