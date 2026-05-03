import styles from './style.module.css'
import {reatomComponent} from "@reatom/npm-react";
import {Breadcrumb} from "antd";
import {Content} from "antd/es/layout/layout";
import { Header } from '../../features/layout/header';
import {Layout} from "../../features/layout/main-layout.tsx";


export const AdminMainPage = reatomComponent(() => {
    return (
        <Layout>
            <Header />
            <div style={{
                maxWidth: '1280px',
                width: '100%',
                margin: '0 auto'
            }}>
                <Content style={{padding: '0 10px'}}>
                    <div className={styles.wrapper}>
                        <Breadcrumb items={[
                            {
                                title: 'Home'
                            },
                        ]}/>

                        <div className={styles.wrapperCard}>
                            <div className={styles.card}>
                                <h3 className={styles.title}>Аналитическая геометрия</h3>

                                <div className={styles.bottom}>
                                    <div className={styles.badge}>
                                        4.78
                                    </div>

                                    <div className={styles.badge}>
                                        8 / 18
                                    </div>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <h3 className={styles.title}>Аналитическая геометрия</h3>

                                <div className={styles.bottom}>
                                    <div className={styles.badge}>
                                        4.78
                                    </div>

                                    <div className={styles.badge}>
                                        8 / 18
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </div>
        </Layout>
    )
})