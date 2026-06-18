import {
    Alert,
    Button,
    Form,
    Input,
    Layout,
    Modal,
} from 'antd'
import { Content, Header } from 'antd/es/layout/layout'

import { reatomComponent } from '@reatom/npm-react'

import { useNavigate } from 'react-router'

import { loginAsync } from '$modules/auth'
import { ThemeSwitcher } from '$modules/theme'

import { isAuthModalOpenAtom } from './home.state'
import type { LoginFormValues } from './home.types'

import styles from './home.module.css'

export const MainPage = reatomComponent(({ ctx }) => {
    const isAuthModalOpen = ctx.spy(isAuthModalOpenAtom)
    const loginError = ctx.spy(loginAsync.errorAtom)
    const navigate = useNavigate()
    const [form] = Form.useForm<LoginFormValues>()

    const onFinish = async (values: LoginFormValues) => {
        loginAsync.errorAtom.reset(ctx)

        const { role } = await loginAsync(ctx, values.email, values.password)

        navigate(`/${role}`)
        isAuthModalOpenAtom(ctx, false)
    }

    const closeAuthModal = () => {
        loginAsync.errorAtom.reset(ctx)
        isAuthModalOpenAtom(ctx, false)
    }

    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>
                <div className={styles.homeButton}>
                    главная
                </div>

                <div className={styles.signInWrapper}>
                    <Button onClick={() => isAuthModalOpenAtom(ctx, true)}>
                        войти
                    </Button>
                    <ThemeSwitcher />
                </div>
            </Header>

            <Content className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        ИМСИТ
                    </div>
                    <div className={styles.subtitle}>
                        тесты
                    </div>
                </div>
            </Content>

            <Modal
                title="вход"
                open={isAuthModalOpen}
                onCancel={closeAuthModal}
                footer={null}
            >
                {loginError && (
                    <Alert type="error" title={loginError.message} showIcon />
                )}

                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={{ email: '', password: '' }}
                >
                    <Form.Item
                        layout="vertical"
                        label="email"
                        name="email"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        layout="vertical"
                        label="пароль"
                        name="password"
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={ctx.spy(loginAsync.statusesAtom).isPending}
                            block
                            type="primary"
                            htmlType="submit"
                        >
                            войти
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    )
})
