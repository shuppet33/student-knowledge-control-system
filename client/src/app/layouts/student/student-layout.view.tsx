import { Content } from 'antd/es/layout/layout'

import { Outlet } from 'react-router'

import { Header } from '../header/header.view'
import { MainLayout } from '../main/main-layout.view'

import styles from './student-layout.module.css'

export const StudentLayout = () => {
    return (
        <MainLayout>
            <Header />

            <div className={styles.container}>
                <Content className={styles.content}>
                    <div className={styles.wrapper}>
                        <Outlet />
                    </div>
                </Content>
            </div>
        </MainLayout>
    )
}
