import { Alert, Button, Card, Flex, Input, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import {
    assignSubjectToMeAsync,
    createSubjectAndAssignToMeAsync,
    teacherSubjectsResource,
} from '$pages/teacher/model/teacher.service'
import {
    changeNewSubjectNameAction,
    changeSelectedSubjectAction,
    closeAddSubjectAction,
    isAddSubjectOpenAtom,
    newSubjectNameAtom,
    selectedNewSubjectIdAtom,
} from '$pages/teacher/model/teacher.state'

import styles from './add-subject-popover.module.css'

const { Text } = Typography

export const AddSubjectPopover = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isAddSubjectOpenAtom)

    const selectedSubjectId = ctx.spy(selectedNewSubjectIdAtom)

    const newSubjectName = ctx.spy(newSubjectNameAtom)
    const subjects = ctx.spy(teacherSubjectsResource.dataAtom)
    const { isPending: isLoadingSubjects } = ctx.spy(
        teacherSubjectsResource.statusesAtom,
    )

    const {
        isPending: isCreatingAndAssigningSubject,
        isFulfilled: isCreateAndAssignFulfilled,
    } = ctx.spy(createSubjectAndAssignToMeAsync.statusesAtom)
    const createAndAssignError = ctx.spy(
        createSubjectAndAssignToMeAsync.errorAtom,
    )

    const {
        isPending: isAssigningSubject,
        isFulfilled: isAssignFulfilled,
    } = ctx.spy(assignSubjectToMeAsync.statusesAtom)
    const assignSubjectError = ctx.spy(assignSubjectToMeAsync.errorAtom)

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
                    onClick={isOpen ? undefined : () => isAddSubjectOpenAtom(ctx, true)}
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
                                        await assignSubjectToMeAsync(ctx)
                                        assignSubjectToMeAsync.errorAtom.reset(ctx)
                                        createSubjectAndAssignToMeAsync.errorAtom.reset(ctx)
                                        return
                                    }
                                    await createSubjectAndAssignToMeAsync(ctx)
                                    createSubjectAndAssignToMeAsync.errorAtom.reset(ctx)
                                    assignSubjectToMeAsync.errorAtom.reset(ctx)
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
        </>
    )
})
