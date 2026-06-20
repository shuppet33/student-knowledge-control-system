import {
    Alert,
    Button,
    Card,
    Collapse,
    Empty,
    Flex,
    Input,
    Popconfirm,
    Spin,
    Tag,
    Typography,
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import {
    deleteTestAsync,
    testsResource,
} from './tests.service'

import styles from './tests.module.css'

const { Search } = Input
const { Text, Title } = Typography

export const TestsManagement = reatomComponent(({ ctx }) => {
    const testGroups = ctx.spy(testsResource.dataAtom)
    const { isPending: isLoadingTests } = ctx.spy(
        testsResource.statusesAtom,
    )
    const { isPending: isDeletingTest } = ctx.spy(
        deleteTestAsync.statusesAtom,
    )
    const deleteError = ctx.spy(deleteTestAsync.errorAtom)

    const collapseItems = testGroups.map(
        (group) => ({
            key: group.subjectId ?? 'without-subject',
            label: (
                <Flex align="center" gap={8}>
                    <Text strong>{group.subjectName}</Text>
                    <Tag>{group.tests.length}</Tag>
                </Flex>
            ),
            children: (
                <div className={styles.testList}>
                    {group.tests.map((test) => (
                        <Card key={test.id}>
                            <Flex
                                justify="space-between"
                                align="flex-start"
                                gap={16}
                            >
                                <Flex vertical gap={12}>
                                    <Title
                                        level={4}
                                        className={styles.title}
                                    >
                                        {test.title}
                                    </Title>

                                    <Text>
                                        Автор:{' '}
                                        {test.createdByName ?? 'не указан'}
                                    </Text>

                                    <Flex gap={8} wrap>
                                        <Tag
                                            color={
                                                test.isActive
                                                    ? 'green'
                                                    : 'default'
                                            }
                                        >
                                            {test.isActive
                                                ? 'активен'
                                                : 'неактивен'}
                                        </Tag>
                                        <Tag
                                            color={
                                                test.isPrivate
                                                    ? 'orange'
                                                    : 'blue'
                                            }
                                        >
                                            {test.isPrivate
                                                ? 'приватный'
                                                : 'публичный'}
                                        </Tag>
                                        <Tag>
                                            {test.showScore
                                                ? 'баллы видны'
                                                : 'баллы скрыты'}
                                        </Tag>
                                        <Tag>
                                            {test.showAnswers
                                                ? 'ответы видны'
                                                : 'ответы скрыты'}
                                        </Tag>
                                    </Flex>

                                    <Text type="secondary">
                                        Лимит попыток:{' '}
                                        {test.maxAttempts ??
                                            'без ограничений'}
                                    </Text>
                                </Flex>

                                <Popconfirm
                                    title="Удалить тест?"
                                    description="Тест будет удалён через soft delete."
                                    okText="Удалить"
                                    cancelText="Отмена"
                                    onConfirm={() =>
                                        deleteTestAsync(ctx, test.id)
                                    }
                                >
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        loading={isDeletingTest}
                                    >
                                        удалить
                                    </Button>
                                </Popconfirm>
                            </Flex>
                        </Card>
                    ))}
                </div>
            ),
        }),
    )

    return (
        <Flex vertical gap={24}>
            <Search
                allowClear
                className={styles.search}
                placeholder="искать по названию"
            />

            {deleteError && (
                <Alert
                    type="error"
                    showIcon
                    title={deleteError.message}
                />
            )}

            {isLoadingTests ? (
                <Spin />
            ) : collapseItems.length === 0 ? (
                <Empty description="Тесты не найдены" />
            ) : (
                <Collapse items={collapseItems} />
            )}
        </Flex>
    )
})
