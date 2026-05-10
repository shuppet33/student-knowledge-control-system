import { Button, Card, Flex, Input, Select, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { QuestionPreviewModal } from '$features/admin/teachers/question-preview/question-preview.view.tsx'
import {
    changeNewSubjectNameAction,
    changeSelectedSubjectAction,
    closeAddSubjectAction,
    openAddSubjectAction,
} from '$features/admin/teachers/teachers.actions.ts'
import {
    isAddSubjectOpenAtom,
    newSubjectNameAtom,
    selectedNewSubjectIdAtom,
} from '$features/admin/teachers/teachers.atoms.ts'
import {
    assignSubjectToTeacherAsync,
    createSubjectAndAssignAsync,
    subjectsResource,
} from '$features/admin/teachers/teachers.services.ts'

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
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.65)',
                        zIndex: 1000,
                    }}
                />
            )}

            <div
                style={{
                    position: 'relative',
                    zIndex: 1001,
                }}
            >
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
                    Предмет
                </Button>

                {isOpen && (
                    <Card
                        style={{
                            position: 'absolute',
                            top: '110%',
                            left: 0,
                            width: 420,
                            zIndex: 1002,
                        }}
                    >
                        <Flex vertical gap={20}>
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                Выберите предмет из списка или добавьте новый
                            </Text>

                            <Select
                                placeholder="Выбор предмета"
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
                                placeholder="Введите новый предмет"
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
                                Добавить предмет
                            </Button>
                        </Flex>
                    </Card>
                )}
            </div>

            <QuestionPreviewModal />
        </>
    )
})
