import { Button, Flex, Input, Modal, Select, Spin, Typography } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import {
    createTeacherTestAsync,
    teacherSubjectGroupsResource,
} from '$pages/teacher/model/teacher.service'
import {
    closeCreateTestModalAction,
    createTeacherTestQuestionDraftsAtom,
    isCreateTestModalOpenAtom,
    openCreateTestQuestionModalAction,
    selectedTeacherTestGroupIdsAtom,
    teacherTestTitleAtom,
} from '$pages/teacher/model/teacher.state'

import { CreateTestQuestionModal } from './create-test-question-modal.view'

import styles from './subject-details.module.css'

const { Text } = Typography

export const CreateTestModal = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isCreateTestModalOpenAtom)
    const title = ctx.spy(teacherTestTitleAtom)
    const subjectGroups = ctx.spy(teacherSubjectGroupsResource.dataAtom)
    const selectedGroupIds = ctx.spy(selectedTeacherTestGroupIdsAtom)
    const questionDrafts = ctx.spy(createTeacherTestQuestionDraftsAtom)
    const { isPending: isSaving } = ctx.spy(
        createTeacherTestAsync.statusesAtom,
    )
    const { isPending: isLoadingGroups } = ctx.spy(
        teacherSubjectGroupsResource.statusesAtom,
    )

    const subjectGroupIds = subjectGroups.map((group) => group.id)

    return (
        <>
            <Modal
                open={isOpen}
                width={760}
                title="Добавить тест"
                okText="Добавить"
                cancelText="Отмена"
                confirmLoading={isSaving}
                onOk={() => createTeacherTestAsync(ctx)}
                onCancel={() => closeCreateTestModalAction(ctx)}
            >
                <Flex vertical gap={16}>
                    <Flex vertical>
                        <Text className={styles.sectionTitle}>
                            Заголовок теста:
                        </Text>
                        <Input
                            size="large"
                            value={title}
                            placeholder="Название теста"
                            onChange={(event) =>
                                teacherTestTitleAtom(
                                    ctx,
                                    event.target.value,
                                )
                            }
                        />
                    </Flex>

                    <Flex vertical>
                        <Text className={styles.sectionTitle}>
                            Доступность групп:
                        </Text>

                        <Select
                            suffixIcon={false}
                            mode="multiple"
                            size="large"
                            loading={isLoadingGroups}
                            placeholder="Выберите группы"
                            value={selectedGroupIds}
                            onChange={(groupIds) => {
                                selectedTeacherTestGroupIdsAtom(
                                    ctx,
                                    groupIds.includes('all')
                                        ? subjectGroupIds
                                        : groupIds,
                                )
                            }}
                            options={[
                                {
                                    value: 'all',
                                    label: 'все',
                                },
                                ...subjectGroups.map((group) => ({
                                    value: group.id,
                                    label: group.name,
                                })),
                            ]}
                        />
                    </Flex>

                    <Flex vertical gap={8}>
                        <Flex vertical>
                            <Text className={styles.sectionTitle}>
                                Вопросы: {questionDrafts.length}
                            </Text>

                            {isLoadingGroups && <Spin />}

                            <Flex className={styles.questionContainer}>
                                {questionDrafts.map((question, index) => (
                                    <Button
                                        key={question.id}
                                        size="small"
                                        className={styles.question}
                                        onClick={() =>
                                            openCreateTestQuestionModalAction(
                                                ctx,
                                                index,
                                            )
                                        }
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </Flex>
                        </Flex>

                        <Flex>
                            <Button
                                type="primary"
                                onClick={() =>
                                    openCreateTestQuestionModalAction(ctx)
                                }
                            >
                                +добавить вопрос
                            </Button>
                        </Flex>
                    </Flex>

                    <Flex vertical>
                        <Text className={styles.sectionTitle}>
                            Загрузка данных:
                        </Text>
                    </Flex>
                </Flex>
            </Modal>

            <CreateTestQuestionModal />
        </>
    )
})
