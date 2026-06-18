import { Button, Card, Flex, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { createTeacherAsync } from '$modules/teachers/teachers.service'
import {
    changeCreateTeacherFieldAction,
    closeCreateTeacherAction,
    openCreateTeacherAction,
} from '$modules/teachers/teachers.state'
import {
    createTeacherFormAtom,
    isCreateTeacherOpenAtom,
} from '$modules/teachers/teachers.state'

import styles from './create-teacher-popover.module.css'

export const CreateTeacherPopover = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isCreateTeacherOpenAtom)

    const form = ctx.spy(createTeacherFormAtom)

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => closeCreateTeacherAction(ctx)}
                    className={styles.overlay}
                />
            )}

            <div className={styles.wrapper}>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    className={isOpen ? styles.activeButton : undefined}
                    onClick={
                        isOpen ? undefined : () => openCreateTeacherAction(ctx)
                    }
                    block
                >
                    добавить
                </Button>

                {isOpen && (
                    <Card className={styles.card}>
                        <Flex vertical gap={16}>
                            <Input
                                placeholder="ФИО"
                                value={form.fullName}
                                onChange={(event) =>
                                    changeCreateTeacherFieldAction(ctx, {
                                        field: 'fullName',
                                        value: event.target.value,
                                    })
                                }
                            />

                            <Input
                                placeholder="Email"
                                value={form.email}
                                onChange={(event) =>
                                    changeCreateTeacherFieldAction(ctx, {
                                        field: 'email',
                                        value: event.target.value,
                                    })
                                }
                            />

                            <Input.Password
                                placeholder="пароль"
                                value={form.password}
                                onChange={(event) =>
                                    changeCreateTeacherFieldAction(ctx, {
                                        field: 'password',
                                        value: event.target.value,
                                    })
                                }
                            />

                            <Input.Password
                                placeholder="повторите пароль"
                                value={form.repeatPassword}
                                onChange={(event) =>
                                    changeCreateTeacherFieldAction(ctx, {
                                        field: 'repeatPassword',
                                        value: event.target.value,
                                    })
                                }
                            />

                            <Button
                                type="primary"
                                onClick={() => createTeacherAsync(ctx)}
                            >
                                добавить
                            </Button>
                        </Flex>
                    </Card>
                )}
            </div>
        </>
    )
})
