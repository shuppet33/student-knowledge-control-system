import { Alert, Button, Card, Flex, Input, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import {
    assignSubjectToTeacherAsync,
    createSubjectAndAssignAsync,
    subjectsResource,
} from '$modules/admin/teachers/teachers.service'
import {
    changeNewSubjectNameAction,
    changeSelectedSubjectAction,
    closeAddSubjectAction,
    isAddSubjectOpenAtom,
    newSubjectNameAtom,
    openAddSubjectAction,
    selectedNewSubjectIdAtom,
} from '$modules/admin/teachers/teachers.state'

import { QuestionPreviewModal } from '../question-preview'

import styles from './add-subject-popover.module.css'

const { Text } = Typography

export const AddSubjectPopover = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isAddSubjectOpenAtom)

    const selectedSubjectId = ctx.spy(selectedNewSubjectIdAtom)

    const newSubjectName = ctx.spy(newSubjectNameAtom)
    const subjects = ctx.spy(subjectsResource.dataAtom)
    const { isPending: isLoadingSubjects } = ctx.spy(subjectsResource.statusesAtom)

    const { isPending: isCreatingAndAssigningSubject, isFulfilled: isCreateAndAssignFulfilled } =
        ctx.spy(createSubjectAndAssignAsync.statusesAtom)
    const createAndAssignError = ctx.spy(createSubjectAndAssignAsync.errorAtom)

    const { isPending: isAssigningSubject, isFulfilled: isAssignFulfilled } = ctx.spy(
        assignSubjectToTeacherAsync.statusesAtom
    )
    const assignSubjectError = ctx.spy(assignSubjectToTeacherAsync.errorAtom)

    return (
        <>
            {isOpen && (
                <div onClick={() => closeAddSubjectAction(ctx)} className={styles.overlay} />
            )}

            <div className={styles.wrapper}>
                <Button
                    icon={<PlusOutlined />}
                    size="large"
                    type="primary"
                    className={isOpen ? styles.activeButton : undefined}
                    onClick={isOpen ? undefined : () => openAddSubjectAction(ctx)}
                    block
                >
                    предмет
                </Button>

                {isOpen && (
                    <Card className={styles.card}>
                        <Flex vertical gap={20}>
                            <Text className={styles.description}>
                                выберите предмет из списка или добавьте новый
                            </Text>

                            <Select
                                showSearch={{ optionFilterProp: 'label' }}
                                disabled={isCreatingAndAssigningSubject || isAssigningSubject}
                                loading={isLoadingSubjects}
                                placeholder="выбор предмета"
                                size="large"
                                value={selectedSubjectId}
                                options={subjects.map((subject) => ({
                                    value: subject.id,
                                    label: subject.name,
                                }))}
                                onChange={(value) => changeSelectedSubjectAction(ctx, value)}
                            />

                            <Input
                                placeholder="введите новый предмет"
                                size="large"
                                value={newSubjectName}
                                disabled={isCreatingAndAssigningSubject || isAssigningSubject}
                                onChange={(event) =>
                                    changeNewSubjectNameAction(ctx, event.target.value)
                                }
                            />

                            <Button
                                type="primary"
                                size="large"
                                onClick={async () => {
                                    if (selectedSubjectId) {
                                        await assignSubjectToTeacherAsync(ctx)
                                        assignSubjectToTeacherAsync.errorAtom.reset(ctx)
                                        createSubjectAndAssignAsync.errorAtom.reset(ctx)
                                        return
                                    }
                                    await createSubjectAndAssignAsync(ctx)
                                    createSubjectAndAssignAsync.errorAtom.reset(ctx)
                                    assignSubjectToTeacherAsync.errorAtom.reset(ctx)
                                }}
                                loading={isCreatingAndAssigningSubject || isAssigningSubject}
                                disabled={!selectedSubjectId && !newSubjectName.trim()}
                            >
                                добавить предмет
                            </Button>

                            {(createAndAssignError || assignSubjectError) && (
                                <Alert
                                    type="error"
                                    showIcon
                                    title={
                                        createAndAssignError?.message ?? assignSubjectError?.message
                                    }
                                />
                            )}
                            {(isCreateAndAssignFulfilled || isAssignFulfilled) && (
                                <Alert type="success" title="Предмет успешно добавлен" showIcon />
                            )}
                        </Flex>
                    </Card>
                )}
            </div>

            <QuestionPreviewModal />
        </>
    )
})
