import { Button, Card, Flex, Popconfirm, Tag, Typography } from 'antd'
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import { deleteTeacherTestAsync } from '../../../../teachers.service'
import {
    expandedTestIdAtom,
    isTestInfoOpenAtom,
    toggleTestAction,
} from '../../../../teachers.state'

import type { TeacherTestCardProps } from './teacher-test-card.types'

import styles from './teacher-test-card.module.css'

const { Text, Title } = Typography

export const TeacherTestCard: FC<TeacherTestCardProps> = reatomComponent(({ ctx, test }) => {
    const expandedTestId = ctx.spy(expandedTestIdAtom)
    const { isPending: isDeleting } = ctx.spy(
        deleteTeacherTestAsync.statusesAtom,
    )

    return (
        <Card
            hoverable
            styles={{
                body: {
                    padding: 0,
                },
            }}
            onClick={() => toggleTestAction(ctx, test.id)}
        >
            <Flex
                justify="space-between"
                align="center"
                className={styles.header}
            >
                <Flex vertical gap={6}>
                    <Title
                        level={4}
                        className={styles.title}
                    >
                        {test.title}
                    </Title>

                    <Flex align="center" gap={6}>
                        <Tag color="green" className={styles.usageTag}>
                            используется
                        </Tag>
                        <Text type="secondary" className={styles.author}>
                            Автор: {test.createdByName ?? 'не указан'}
                        </Text>
                    </Flex>
                </Flex>

                <Flex gap={8}>
                    <Button
                        icon={<InfoCircleOutlined />}
                        onClick={(event) => {
                            event.stopPropagation()
                            isTestInfoOpenAtom(ctx, true)
                        }}
                    />

                    <Popconfirm
                        title="Удалить тест?"
                        description="Тест будет удалён через soft delete."
                        okText="Удалить"
                        cancelText="Отмена"
                        onConfirm={(event) => {
                            event?.stopPropagation()
                            return deleteTeacherTestAsync(ctx, test.id)
                        }}
                        onCancel={(event) => event?.stopPropagation()}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            loading={isDeleting}
                            onClick={(event) => event.stopPropagation()}
                        />
                    </Popconfirm>
                </Flex>
            </Flex>
            {expandedTestId === test.id && null}
        </Card>
    )
})
