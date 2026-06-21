import { Button, Card, Flex, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import clsx from 'clsx'

import { createUserAsync } from './create-user-popover.service'
import {
    changeCreateUserFieldAction,
    closeCreateUserAction,
    createUserFormAtom,
    isCreateUserOpenAtom,
    openCreateUserAction,
} from './create-user-popover.state'
import type { CreateUserPopoverProps } from './create-user-popover.types'

import styles from './create-user-popover.module.css'

export const CreateUserPopover = reatomComponent<CreateUserPopoverProps>(
    ({ ctx, role }) => {
        const isOpen = ctx.spy(isCreateUserOpenAtom)
        const form = ctx.spy(createUserFormAtom)
        const { isPending } = ctx.spy(createUserAsync.statusesAtom)

        return (
            <>
                {isOpen && (
                    <div
                        onClick={() => closeCreateUserAction(ctx)}
                        className={styles.overlay}
                    />
                )}

                <div className={clsx(isOpen && styles.wrapper)}>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        className={isOpen ? styles.activeButton : undefined}
                        onClick={
                            isOpen
                                ? undefined
                                : () => openCreateUserAction(ctx)
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
                                        changeCreateUserFieldAction(ctx, {
                                            field: 'fullName',
                                            value: event.target.value,
                                        })
                                    }
                                />

                                <Input
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(event) =>
                                        changeCreateUserFieldAction(ctx, {
                                            field: 'email',
                                            value: event.target.value,
                                        })
                                    }
                                />

                                <Input.Password
                                    placeholder="пароль"
                                    value={form.password}
                                    onChange={(event) =>
                                        changeCreateUserFieldAction(ctx, {
                                            field: 'password',
                                            value: event.target.value,
                                        })
                                    }
                                />

                                <Input.Password
                                    placeholder="повторите пароль"
                                    value={form.repeatPassword}
                                    onChange={(event) =>
                                        changeCreateUserFieldAction(ctx, {
                                            field: 'repeatPassword',
                                            value: event.target.value,
                                        })
                                    }
                                />

                                <Button
                                    type="primary"
                                    loading={isPending}
                                    onClick={() => createUserAsync(ctx, role)}
                                >
                                    добавить
                                </Button>
                            </Flex>
                        </Card>
                    )}
                </div>
            </>
        )
    },
)
