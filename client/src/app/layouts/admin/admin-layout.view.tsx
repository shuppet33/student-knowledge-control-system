import { Content } from 'antd/es/layout/layout'

import { Outlet } from 'react-router'

import { Header } from '../header/header.view'
import { MainLayout } from '../main/main-layout.view'

import styles from './admin-layout.module.css'

export const AdminLayout = () => {
    return (
        <MainLayout>
            <Header />

            <div
                style={{
                    maxWidth: '1280px',
                    width: '100%',
                    margin: '0 auto',
                }}
            >
                <Content style={{ padding: '0 10px' }}>
                    <div className={styles.wrapper}>
                        <Outlet />
                    </div>
                </Content>
            </div>
        </MainLayout>
    )
}
