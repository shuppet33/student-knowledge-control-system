import { Button, Card, Flex, Switch, Tag, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import type { FC } from 'react'

import type { TeacherSubjectTest } from '$common/api/teacher/teacher.types'

import styles from './teacher-test-card.module.css'

const { Text, Title } = Typography

type TeacherTestCardProps = {
    test: TeacherSubjectTest
    onEdit: () => void
    onDelete: () => void
    onToggleActive: () => void
}

export const TeacherTestCard: FC<TeacherTestCardProps> = ({
    test,
    onEdit,
    onDelete,
    onToggleActive,
}) => {
    return (
        <Card
            hoverable
            className={styles.card}
            styles={{
                body: {
                    padding: 20,
                },
            }}
            onClick={onEdit}
        >
            <Flex justify="space-between" align="center" gap={20}>
                <Flex vertical gap={8}>
                    <Title level={4} className={styles.title}>
                        {test.title}
                    </Title>

                    <Flex align="center" gap={8}>
                        <Tag color={test.isActive ? 'green' : 'red'} className={styles.usageTag}>
                            {test.isActive ? 'используется' : 'не используется'}
                        </Tag>
                        <Text type="secondary" className={styles.author}>
                            Автор: {test.createdByName ?? 'не указан'}
                        </Text>
                    </Flex>
                </Flex>

                <Flex align="center" gap={16}>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(event) => {
                            event.stopPropagation()
                            onDelete()
                        }}
                    />
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={(event) => {
                            event.stopPropagation()
                            onEdit()
                        }}
                    />
                    <Switch
                        checked={test.isActive}
                        onClick={(_, event) => event.stopPropagation()}
                        onChange={onToggleActive}
                    />
                </Flex>
            </Flex>
        </Card>
    )
}
