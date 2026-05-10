import { Content } from 'antd/es/layout/layout'

import { reatomComponent } from '@reatom/npm-react'

import { Route, Routes } from 'react-router'

import { TeachersPage } from '$pages/admin/teachers/teachers-page.view'

import { Header } from '$features/layout/header.tsx'
import { Layout } from '$features/layout/main-layout.tsx'

import styles from './style.module.css'


export const AdminMainPage = reatomComponent(() => {
    return (
        <Layout>
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
                        <Routes>
                            <Route
                                index
                                element={<div>Главная админки</div>}
                            />

                            <Route
                                path="teachers"
                                element={<TeachersPage />}
                            />
                        </Routes>
                    </div>
                </Content>
            </div>
        </Layout>
    )
})
