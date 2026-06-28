import { Button, Flex, Input, Modal, Select, Spin, Typography } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useLoaderData } from 'react-router'

import type { SubjectLoaderData } from '$app/router/router.view'

import {
    changeSubjectNameAction, deleteTeacherTestAsync,
    saveTeacherSubjectGroupsAsync,
    saveTeacherTestAsync,
    teacherGroupsResource,
    teacherSubjectGroupsResource,
    teacherSubjectResource,
    teacherSubjectTestsResource,
    teacherTestDetailsResource,
    toggleTeacherTestActiveAsync,
} from '$pages/teacher/model/teacher.service'
import {
    changeTeacherTestTitleAction,
    closeEditTestModalAction,
    isAddQuestionModalOpenAtom,
    isEditTestModalOpenAtom,
    openAddQuestionModalAction,
    openCreateTestModalAction,
    openEditTestModalAction,
    selectedGroupIdsAtom,
    selectedTeacherTestGroupIdsAtom,
    setSelectedGroupIdsAction,
    setSelectedTeacherTestGroupIdsAction,
    subjectIdAtom,
    subjectNameAtom,
    teacherTestTitleAtom,
} from '$pages/teacher/model/teacher.state'

import {
    openQuestionPreviewAction,
    QuestionPreviewModal,
} from '$modules/admin/teachers/ui/question-preview'

import { AddQuestionModal } from './add-question-modal.view'
import { CreateTestModal } from './create-test-modal.view'
import { TeacherTestCard } from './teacher-test-card.view'

import styles from './subject-details.module.css'

const { Text } = Typography
const { TextArea } = Input

type TeacherSubjectDetailsProps = {
    subjectId: string
}

const TeacherSubjectDetails = reatomComponent<TeacherSubjectDetailsProps>(({
    ctx,
    subjectId,
}) => {
    if (ctx.get(subjectIdAtom) !== subjectId) {
        subjectIdAtom(ctx, subjectId)
    }

    const subject = ctx.spy(teacherSubjectResource.dataAtom)
    const subjectName = ctx.spy(subjectNameAtom)
    const subjectGroups = ctx.spy(teacherSubjectGroupsResource.dataAtom)
    const tests = ctx.spy(teacherSubjectTestsResource.dataAtom)
    const testDetails = ctx.spy(teacherTestDetailsResource.dataAtom)

    const allGroups = ctx.spy(teacherGroupsResource.dataAtom)
    const selectedGroupIds = ctx.spy(selectedGroupIdsAtom)
    const isEditTestModalOpen = ctx.spy(isEditTestModalOpenAtom)
    const isAddQuestionModalOpen = ctx.spy(isAddQuestionModalOpenAtom)
    const teacherTestTitle = ctx.spy(teacherTestTitleAtom)
    const selectedTeacherTestGroupIds = ctx.spy(
        selectedTeacherTestGroupIdsAtom,
    )

    const { isPending: isLoadingSubject } = ctx.spy(
        teacherSubjectResource.statusesAtom,
    )
    const { isPending: isSavingGroups } = ctx.spy(
        saveTeacherSubjectGroupsAsync.statusesAtom,
    )
    const { isPending: isSavingTest } = ctx.spy(
        saveTeacherTestAsync.statusesAtom,
    )
    const { isPending: isLoadingTestDetails } = ctx.spy(
        teacherTestDetailsResource.statusesAtom,
    )
    const subjectGroupIds = subjectGroups.map((group) => group.id)

    if ((isLoadingSubject && !subject) || subject?.id !== subjectId) {
        return <Spin />
    }

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <section>
                    <Text className={styles.sectionTitle}>Название предмета</Text>
                    <TextArea
                        className={styles.nameInput}
                        value={subjectName}
                        onChange={(event) =>
                            changeSubjectNameAction(ctx, event.target.value)
                        }
                    />
                </section>

                <section className={styles.section}>
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={() => openCreateTestModalAction(ctx)}
                    >
                        Добавить тест
                    </Button>
                </section>

                <section className={styles.section}>
                    <Text className={styles.sectionTitle}>Доступность группы</Text>

                    <Select
                        suffixIcon={false}
                        mode="multiple"
                        className={styles.relationSelect}
                        virtual
                        styles={{
                            content: {
                                maxHeight: '116px',
                                overflowY: 'auto',
                                boxSizing: 'border-box',
                                width: '100%',
                            },
                        }}
                        showSearch={{ optionFilterProp: 'label' }}
                        placeholder="Выберите группы"
                        value={selectedGroupIds}
                        loading={isSavingGroups}
                        onChange={(groupIds) => {
                            setSelectedGroupIdsAction(ctx, groupIds)
                            saveTeacherSubjectGroupsAsync(ctx)
                        }}
                        options={allGroups.map((group) => ({
                            value: group.id,
                            label: group.name,
                        }))}
                    />
                </section>
            </aside>

            <main className={styles.content}>
                <Flex vertical gap={16}>
                    {tests.map((test) => (
                        <TeacherTestCard
                            key={test.teacherTestId}
                            test={test}
                            onDelete={() => deleteTeacherTestAsync(ctx, test.id)}
                            onEdit={() => openEditTestModalAction(ctx, test)}
                            onToggleActive={() =>
                                toggleTeacherTestActiveAsync(ctx, test)
                            }
                        />
                    ))}
                </Flex>
            </main>

            <CreateTestModal />

            <Modal
                open={isEditTestModalOpen}
                width={760}
                title="Редактирование теста"
                okText="Сохранить"
                cancelText="Отмена"
                confirmLoading={isSavingTest}
                onOk={() => saveTeacherTestAsync(ctx)}
                onCancel={() => closeEditTestModalAction(ctx)}
            >
                <Flex vertical gap={16}>
                    <Flex vertical>
                        <Text className={styles.sectionTitle}>Заголовок теста:</Text>
                        <Input
                            size="large"
                            value={teacherTestTitle}
                            placeholder="Название теста"
                            onChange={(event) =>
                                changeTeacherTestTitleAction(ctx, event.target.value)
                            }
                        />
                    </Flex>

                    <Flex vertical>
                        <Text className={styles.sectionTitle}>Доступность групп:</Text>

                        <Select
                            suffixIcon={false}
                            mode="multiple"
                            size="large"
                            placeholder="Выберите группы"
                            value={selectedTeacherTestGroupIds}
                            onChange={(groupIds) => {
                                setSelectedTeacherTestGroupIdsAction(
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
                                Вопросы: {testDetails?.questionsCount ?? 0}
                            </Text>

                            {isLoadingTestDetails && <Spin />}

                            {!isLoadingTestDetails && (
                                <Flex className={styles.questionContainer}>
                                    {testDetails?.questions.map((question) => (
                                        <Button
                                            key={question.id}
                                            size="small"
                                            className={styles.question}
                                            onClick={() =>
                                                openQuestionPreviewAction(
                                                    ctx,
                                                    question.id,
                                                )
                                            }
                                        >
                                            {question.position}
                                        </Button>
                                    ))}
                                </Flex>
                            )}
                        </Flex>

                        <Flex>
                            <Button
                                type="primary"
                                onClick={() =>
                                    openAddQuestionModalAction(
                                        ctx,
                                        testDetails?.questions ?? [],
                                    )
                                }
                            >
                                +добавить вопрос
                            </Button>
                        </Flex>
                    </Flex>

                    <Flex vertical>
                        <Text className={styles.sectionTitle}>Выгрузка результатов:</Text>
                    </Flex>

                </Flex>
            </Modal>

            {isAddQuestionModalOpen && <AddQuestionModal />}

            <QuestionPreviewModal
                questions={testDetails?.questions ?? []}
            />
        </div>
    )
})

export const TeacherSubjectDetailsPage = () => {
    const { subjectId } = useLoaderData<SubjectLoaderData>()

    if (!subjectId) {
        return null
    }

    return <TeacherSubjectDetails subjectId={subjectId} key={subjectId} />
}
