import { Alert, Button, Card, Empty, Flex, Input, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { useNavigate } from 'react-router'

import { EntityCard } from '$common/ui/entity-card'

import { createSubjectAsync, deleteSubjectAsync, subjectsResource } from './subjects.service'
import {
    closeCreateSubjectAction,
    isCreateSubjectOpenAtom,
    newSubjectNameAtom,
} from './subjects.state'

import styles from './subjects.module.css'

const { Search } = Input

export const SubjectsManagement = reatomComponent(({ ctx }) => {
    const navigate = useNavigate()
    const subjects = ctx.spy(subjectsResource.dataAtom)
    const isCreateOpen = ctx.spy(isCreateSubjectOpenAtom)
    const newSubjectName = ctx.spy(newSubjectNameAtom)
    const { isPending: isLoadingSubjects } = ctx.spy(subjectsResource.statusesAtom)
    const { isPending: isCreatingSubject } = ctx.spy(createSubjectAsync.statusesAtom)
    const createError = ctx.spy(createSubjectAsync.errorAtom)
    
    console.log('LOOOG', isCreateOpen)

    return (
        <>
            <Flex vertical gap={24}>
                <Flex gap={16} wrap>
                    {isCreateOpen && (
                        <div
                            className={styles.overlay}
                            onClick={() => closeCreateSubjectAction(ctx)}
                        />
                    )}

                    <div className={styles.createWrapper}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            className={isCreateOpen && styles.activeButton}
                            onClick={() => isCreateSubjectOpenAtom(ctx, true)}
                        >
                            добавить
                        </Button>

                        {isCreateOpen && (
                            <Card className={styles.createCard}>
                                <Flex vertical gap={16}>
                                    <Input
                                        autoFocus
                                        placeholder="название предмета"
                                        value={newSubjectName}
                                        disabled={isCreatingSubject}
                                        onChange={(event) =>
                                            newSubjectNameAtom(ctx, event.target.value)
                                        }
                                        onPressEnter={() => createSubjectAsync(ctx)}
                                    />

                                    {createError && (
                                        <Alert type="error" showIcon title={createError.message} />
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
                            </Card>
                        )}
                    </div>

                    <Search allowClear className={styles.search} placeholder="искать по названию" />
                </Flex>

                {isLoadingSubjects ? (
                    <Spin />
                ) : subjects.length === 0 ? (
                    <Empty description="Предметы не найдены" />
                ) : (
                    <div className={styles.list}>
                        {subjects.map((subject) => (
                            <EntityCard
                                key={subject.id}
                                title={subject.name}
                                onClick={() => navigate(`/admin/subjects/${subject.id}`)}
                                onDelete={() => deleteSubjectAsync(ctx, subject.id)}
                            />
                        ))}
                    </div>
                )}
            </Flex>
        </>
    )
})
