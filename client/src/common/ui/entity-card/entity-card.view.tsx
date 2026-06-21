import { Button, Card, Popconfirm, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import type { FC, MouseEvent } from 'react'

import type { EntityCardProps } from './entity-card.types'

import styles from './entity-card.module.css'

const { Title } = Typography

export const EntityCard: FC<EntityCardProps> = ({
    title,
    onClick,
    onDelete,
}) => {
    const stopPropagation = (event?: MouseEvent<HTMLElement>) => {
        event?.stopPropagation()
    }

    return (
        <Card
            className={styles.card}
            onClick={onClick}
            styles={{
                body: {
                    height: '100%',
                    padding: 20,
                },
            }}
        >
            <Title level={4} className={styles.title}>
                {title}
            </Title>

            {onDelete && (
                <Popconfirm
                    title="Удалить?"
                    okText="Удалить"
                    cancelText="Отмена"
                    onConfirm={(event) => {
                        event?.stopPropagation()
                        return onDelete()
                    }}
                    onCancel={stopPropagation}
                >
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        className={styles.deleteButton}
                        onClick={stopPropagation}
                    />
                </Popconfirm>
            )}
        </Card>
    )
}
