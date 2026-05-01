import {Layout} from "$features/layout/main-layout.tsx";
import {Button, Form, Input, Modal, theme} from 'antd';
import {authAtom} from "$entities/auth/auth.atom.ts";
import {Link, useNavigate, useRouter} from "@tanstack/react-router";
import {reatomComponent} from "@reatom/react";
import {useEffect} from "react";
import {loginAsync} from "$entities/auth/auth.actions.ts";
import {modalAtom} from "$entities/modal.ts";
import {Content, Header} from "antd/es/layout/layout";

import styles from './main.module.css'
import {ThemeSwitcher} from "$features/shared/theme-switch";


export const MainPage = reatomComponent(() => {
    const router = useRouter()
    const navigate = useNavigate()
    const {
        token: {colorBgContainer, colorText, colorLink},
    } = theme.useToken();


    const {token, role} = authAtom()
    const open = modalAtom()

    const [form] = Form.useForm();

    const onFinish = async (values: { email: string, password: string }) => {
        form.resetFields();
        modalAtom.set(false)
        try {
            await loginAsync(values.email, values.password)
            router.invalidate()
        } catch (e) {
            console.error(e)
        }
    };

    useEffect(() => {
        if (token && role) {
            navigate({to: `/${role}`})
        }
    }, [token, role])

    return (
        <Layout>
            <Header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colorBgContainer
            }}>
                <div>
                    <Button>
                        <Link to={'/'}>
                            главная
                        </Link>
                    </Button>
                </div>
                <div className={styles.signInWrapper}>
                    <Button onClick={() => modalAtom.set(true)}>
                        войти
                    </Button>
                    <ThemeSwitcher/>
                </div>
            </Header>


            <Content className={styles.content}>

                <div className={styles.wrapper}>
                    <div className={styles.title} style={{color: colorLink}}>
                        ИМСИТ
                    </div>
                    <div className={styles.subtitle} style={{color: colorText}}>
                        тесты
                    </div>
                </div>

            </Content>


            <Modal title='Вход' open={open} onCancel={() => modalAtom.set(false)} footer={null}>
                <Form onFinish={onFinish} form={form} initialValues={{
                    email: '',
                    password: ''
                }}>
                    <Form.Item layout={"vertical"} label={'username'} name='email' rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item layout={"vertical"} label={'password'} name='password' rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={null}>
                        <Button block type={'primary'} htmlType="submit">Войти</Button>
                    </Form.Item>
                </Form>
            </Modal>

        </Layout>
    )
})