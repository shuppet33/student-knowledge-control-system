import {reatomComponent} from "@reatom/npm-react";
import {Button, Form, Input, Modal, theme as antdTheme} from "antd";
import {authAtom, getTokenAuthAsync} from "../../entities/api.ts";
import {Content, Header} from "antd/es/layout/layout";
import {Link, useNavigate} from "react-router";

import styles from './style.module.css'
import {atom} from "@reatom/framework";
import {ThemeSwitcher} from "../../features/shared/theme-switch.tsx";
import {Layout} from "../../features/layout/main-layout.tsx";

const iaModalAuthAtom = atom(false)

export const MainPage = reatomComponent(({ctx}) => {
    const open = ctx.spy(iaModalAuthAtom)
    const navigate = useNavigate();
    const {
        token: {colorBgContainer, colorText, colorLink},
    } = antdTheme.useToken();

    const [form] = Form.useForm();

    const onFinish = async (values: { email: string, password: string }) => {
        await getTokenAuthAsync(ctx, values.email, values.password)
        const {role} = ctx.get(authAtom);
        navigate(`/${role}`);
    }

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
                    <Button onClick={() => iaModalAuthAtom(ctx, true)}>
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

            <Modal title='Вход' open={open} onCancel={() => iaModalAuthAtom(ctx, false)} footer={null}>
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
                        <Button loading={ctx.spy(getTokenAuthAsync.statusesAtom).isPending} block type={'primary'}
                                htmlType="submit">Войти</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
})