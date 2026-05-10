import { Button, Card, Flex, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import {
    changeCreateTeacherFieldAction,
    closeCreateTeacherAction,
    openCreateTeacherAction,
} from '$features/admin/teachers/teachers.actions.ts'
import {
    createTeacherFormAtom,
    isCreateTeacherOpenAtom,
} from '$features/admin/teachers/teachers.atoms.ts'
import { createTeacherAsync } from '$features/admin/teachers/teachers.services.ts'

import styles from './create-teacher-popover.module.css'

export const CreateTeacherPopover = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isCreateTeacherOpenAtom)

    const form = ctx.spy(createTeacherFormAtom)

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => closeCreateTeacherAction(ctx)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.65)',
                        zIndex: 98,
                    }}
                />
            )}

            <div
                style={{
                    position: 'relative',
                    zIndex: 99,
                }}
            >
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    className={isOpen ? styles.activeButton : undefined}
                    onClick={
                        isOpen ? undefined : () => openCreateTeacherAction(ctx)
                    }
                    block
                >
                    Добавить
                </Button>

                {isOpen && (
                    <Card
                        style={{
                            position: 'absolute',
                            top: '120%',
                            left: 0,
                            width: 420,
                            zIndex: 1002,
                        }}
                    >
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
                                placeholder="Пароль"
                                value={form.password}
                                onChange={(event) =>
                                    changeCreateTeacherFieldAction(ctx, {
                                        field: 'password',
                                        value: event.target.value,
                                    })
                                }
                            />

                            <Input.Password
                                placeholder="Повторите пароль"
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
                                Добавить
                            </Button>
                        </Flex>
                    </Card>
                )}
            </div>
        </>
    )
})
