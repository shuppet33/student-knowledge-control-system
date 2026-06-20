import {
    Alert,
    Button,
    Card,
    Empty,
    Flex,
    Input,
    Modal,
    Spin,
    Typography,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import {
    createSubjectAsync,
    subjectsResource,
} from './subjects.service'
import {
    changeNewSubjectNameAction,
    closeCreateSubjectAction,
    isCreateSubjectOpenAtom,
    newSubjectNameAtom,
    openCreateSubjectAction,
} from './subjects.state'

import styles from './subjects.module.css'

const { Search } = Input
const { Title } = Typography

export const SubjectsManagement = reatomComponent(({ ctx }) => {
    const subjects = ctx.spy(subjectsResource.dataAtom)
    const isCreateOpen = ctx.spy(isCreateSubjectOpenAtom)
    const newSubjectName = ctx.spy(newSubjectNameAtom)
    const { isPending: isLoadingSubjects } = ctx.spy(
        subjectsResource.statusesAtom,
    )
    const { isPending: isCreatingSubject } = ctx.spy(
        createSubjectAsync.statusesAtom,
    )
    const createError = ctx.spy(createSubjectAsync.errorAtom)

    return (
        <>
            <Flex vertical gap={24}>
                <Flex gap={16} wrap>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openCreateSubjectAction(ctx)}
                    >
                        добавить
                    </Button>

                    <Search
                        allowClear
                        className={styles.search}
                        placeholder="искать по названию"
                    />
                </Flex>

                {isLoadingSubjects ? (
                    <Spin />
                ) : subjects.length === 0 ? (
                    <Empty description="Предметы не найдены" />
                ) : (
                    <Flex wrap gap={16}>
                        {subjects.map((subject) => (
                            <Card
                                key={subject.id}
                                hoverable
                                size="small"
                                className={styles.card}
                            >
                                <Title
                                    level={5}
                                    className={styles.title}
                                >
                                    {subject.name}
                                </Title>
                            </Card>
                        ))}
                    </Flex>
                )}
            </Flex>

            <Modal
                title="Добавить предмет"
                open={isCreateOpen}
                onCancel={() => closeCreateSubjectAction(ctx)}
                footer={null}
                destroyOnHidden
            >
                <Flex vertical gap={16}>
                    <Input
                        autoFocus
                        placeholder="название предмета"
                        value={newSubjectName}
                        disabled={isCreatingSubject}
                        onChange={(event) =>
                            changeNewSubjectNameAction(
                                ctx,
                                event.target.value,
                            )
                        }
                        onPressEnter={() => createSubjectAsync(ctx)}
                    />

                    {createError && (
                        <Alert
                            type="error"
                            showIcon
                            title={createError.message}
                        />
                    )}

                    <Button
                        type="primary"
                        loading={isCreatingSubject}
                        disabled={!newSubjectName.trim()}
                        onClick={() => createSubjectAsync(ctx)}
                    >
                        добавить
                    </Button>
                </Flex>
            </Modal>
        </>
    )
})
