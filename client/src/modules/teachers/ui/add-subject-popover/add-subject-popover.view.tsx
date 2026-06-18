import { Button, Card, Flex, Input, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import {
    assignSubjectToTeacherAsync,
    createSubjectAndAssignAsync,
    subjectsResource,
} from '$modules/teachers/teachers.service'
import {
    changeNewSubjectNameAction,
    changeSelectedSubjectAction,
    closeAddSubjectAction,
    openAddSubjectAction,
} from '$modules/teachers/teachers.state'
import {
    isAddSubjectOpenAtom,
    newSubjectNameAtom,
    selectedNewSubjectIdAtom,
} from '$modules/teachers/teachers.state'

import { QuestionPreviewModal } from '../question-preview'

import styles from './add-subject-popover.module.css'

const { Text } = Typography

export const AddSubjectPopover = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isAddSubjectOpenAtom)

    const selectedSubjectId = ctx.spy(selectedNewSubjectIdAtom)

    const newSubjectName = ctx.spy(newSubjectNameAtom)
    const subjects = ctx.spy(subjectsResource.dataAtom)

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => closeAddSubjectAction(ctx)}
                    className={styles.overlay}
                />
            )}

            <div className={styles.wrapper}>
                <Button
                    icon={<PlusOutlined />}
                    size="large"
                    type="primary"
                    className={isOpen ? styles.activeButton : undefined}
                    onClick={
                        isOpen ? undefined : () => openAddSubjectAction(ctx)
                    }
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
                                placeholder="выбор предмета"
                                size="large"
                                value={selectedSubjectId}
                                options={subjects.map((subject) => ({
                                    value: subject.id,
                                    label: subject.name,
                                }))}
                                onChange={(value) =>
                                    changeSelectedSubjectAction(ctx, value)
                                }
                            />

                            <Input
                                placeholder="введите новый предмет"
                                size="large"
                                value={newSubjectName}
                                onChange={(event) =>
                                    changeNewSubjectNameAction(
                                        ctx,
                                        event.target.value,
                                    )
                                }
                            />

                            <Button
                                type="primary"
                                size="large"
                                onClick={() => {
                                    if (selectedSubjectId) {
                                        assignSubjectToTeacherAsync(ctx)
                                        return
                                    }
                                    createSubjectAndAssignAsync(ctx)
                                }}
                                disabled={
                                    !selectedSubjectId && !newSubjectName.trim()
                                }
                            >
                                добавить предмет
                            </Button>
                        </Flex>
                    </Card>
                )}
            </div>

            <QuestionPreviewModal />
        </>
    )
})
