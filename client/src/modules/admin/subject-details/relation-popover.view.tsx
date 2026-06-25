import { Button, Card, Flex, Typography } from 'antd'
import {
    CheckOutlined,
    CloseOutlined,
    PlusOutlined,
} from '@ant-design/icons'

import clsx from 'clsx'
import type { FC } from 'react'

import styles from './subject-details.module.css'

const { Text } = Typography

type Item = {
    id: string
    name: string
}

type Props = {
    items: Item[]
    selectedIds: string[]
    isOpen: boolean
    isSaving: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: (id: string) => void
    onSave: () => void
}

export const RelationPopover: FC<Props> = ({
    items,
    selectedIds,
    isOpen,
    isSaving,
    onOpen,
    onClose,
    onToggle,
    onSave,
}) => {
    const selectedItems = items.filter((item) =>
        selectedIds.includes(item.id),
    )

    return (
        <>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose} />
            )}

            <div className={clsx(isOpen && styles.popoverWrapper)}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    block
                    onClick={isOpen ? undefined : onOpen}
                >
                    добавить
                </Button>

                {isOpen && (
                    <Card className={styles.popoverCard}>
                        <Flex vertical gap={14}>
                            <div className={styles.selectedItems}>
                                {selectedItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className={styles.selectedItem}
                                    >
                                        <span>{item.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => onToggle(item.id)}
                                        >
                                            <CloseOutlined />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.optionsList}>
                                {items.map((item) => {
                                    const selected = selectedIds.includes(
                                        item.id,
                                    )

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={styles.option}
                                            onClick={() =>
                                                onToggle(item.id)
                                            }
                                        >
                                            <Text>{item.name}</Text>
                                            {selected ? (
                                                <CheckOutlined />
                                            ) : (
                                                <CloseOutlined />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>

                            <Button
                                type="primary"
                                loading={isSaving}
                                onClick={onSave}
                            >
                                сохранить
                            </Button>
                        </Flex>
                    </Card>
                )}
            </div>
        </>
    )
}
