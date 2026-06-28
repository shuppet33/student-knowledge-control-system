import { Button, Card, Flex, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import clsx from 'clsx'

import { createGroupAsync } from './create-group-popover.service.ts'
import {
    changeCreateGroupFieldAction,
    closeCreateGroupAction,
    createGroupFormAtom,
    isCreateGroupOpenAtom,
} from './create-group-popover.state.ts'

import styles from './create-group-popover.module.css'

export const CreateGroupPopover = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isCreateGroupOpenAtom)
    const form = ctx.spy(createGroupFormAtom)
    const { isPending } = ctx.spy(createGroupAsync.statusesAtom)

    return (
        <>
            {isOpen && (
                <div onClick={() => closeCreateGroupAction(ctx)} className={styles.overlay} />
            )}

            <div className={clsx(isOpen && styles.wrapper)}>
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    className={isOpen ? styles.activeButton : undefined}
                    onClick={isOpen ? undefined : () => isCreateGroupOpenAtom(ctx, true)}
                    block
                >
                    создать группу
                </Button>

                {isOpen && (
                    <Card className={styles.card}>
                        <Flex vertical gap={16}>
                            <Input
                                placeholder="название"
                                value={form.name}
                                onChange={(event) =>
                                    changeCreateGroupFieldAction(ctx, {
                                        field: 'name',
                                        value: event.target.value,
                                    })
                                }
                            />

                            <Button
                                type="primary"
                                loading={isPending}
                                onClick={() => createGroupAsync(ctx)}
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
