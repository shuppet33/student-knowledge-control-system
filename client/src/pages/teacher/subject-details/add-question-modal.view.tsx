import { Button, Checkbox, Flex, Input, Modal } from 'antd'
import {
    DeleteOutlined,
    LeftOutlined,
    PlusOutlined,
    RightOutlined,
} from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { saveTeacherTestQuestionsAsync } from '$pages/teacher/model/teacher.service'
import {
    addTeacherQuestionAnswerAction,
    addTeacherQuestionDraftAction,
    changeTeacherQuestionAnswerAction,
    changeTeacherQuestionTextAction,
    closeAddQuestionModalAction,
    deleteTeacherQuestionAnswerAction,
    deleteTeacherQuestionDraftAction,
    isAddQuestionModalOpenAtom,
    nextTeacherQuestionDraftAction,
    prevTeacherQuestionDraftAction,
    selectedTeacherQuestionDraftIndexAtom,
    setSelectedTeacherQuestionDraftIndexAction,
    teacherQuestionDraftsAtom,
} from '$pages/teacher/model/teacher.state'

import styles from './add-question-modal.module.css'

const { TextArea } = Input

export const AddQuestionModal = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isAddQuestionModalOpenAtom)
    const questions = ctx.spy(teacherQuestionDraftsAtom)
    const currentIndex = ctx.spy(selectedTeacherQuestionDraftIndexAtom)
    const { isPending: isSaving } = ctx.spy(
        saveTeacherTestQuestionsAsync.statusesAtom,
    )

    const currentQuestion = questions[currentIndex]
    const canAddAnswer = (currentQuestion?.answers.length ?? 0) < 4
    const questionNumber = currentIndex + 1
    const navigationItems = questions.map((question, index) => ({
        id: question.id,
        position: index + 1,
    }))

    return (
        <Modal
            open={isOpen}
            footer={null}
            width={920}
            centered
            onCancel={() => closeAddQuestionModalAction(ctx)}
        >
            {currentQuestion && (
                <Flex vertical className={styles.content}>
                    <Flex align="center" gap={12} className={styles.header}>
                        <Button type="primary" className={styles.questionNumber}>
                            {questionNumber}
                        </Button>

                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            disabled={questions.length === 1}
                            loading={isSaving}
                            onClick={() => deleteTeacherQuestionDraftAction(ctx)}
                        />
                    </Flex>

                    <div className={styles.questionTextBox}>
                        <TextArea
                            value={currentQuestion.text}
                            autoSize={false}
                            className={styles.questionText}
                            placeholder="Текст вопроса"
                            onChange={(event) =>
                                changeTeacherQuestionTextAction(
                                    ctx,
                                    event.target.value,
                                )
                            }
                        />
                    </div>

                    <Flex wrap gap={20} className={styles.answers}>
                        {currentQuestion.answers.map((answer, index) => (
                            <Flex
                                key={answer.id}
                                align="center"
                                gap={12}
                                className={`${styles.answer} ${
                                    answer.isCorrect ? styles.correctAnswer : ''
                                }`}
                            >
                                <Checkbox
                                    checked={answer.isCorrect}
                                    onChange={(event) =>
                                        changeTeacherQuestionAnswerAction(
                                            ctx,
                                            answer.id,
                                            {
                                                isCorrect: event.target.checked,
                                            },
                                        )
                                    }
                                />

                                <TextArea
                                    value={answer.text}
                                    placeholder={`Ответ ${index + 1}`}
                                    className={styles.answerInput}
                                    autoSize={false}
                                    onChange={(event) =>
                                        changeTeacherQuestionAnswerAction(
                                            ctx,
                                            answer.id,
                                            {
                                                text: event.target.value,
                                            },
                                        )
                                    }
                                />

                                <Button
                                    danger
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        deleteTeacherQuestionAnswerAction(
                                            ctx,
                                            answer.id,
                                        )
                                    }
                                />
                            </Flex>
                        ))}
                    </Flex>

                    <Button
                        type="primary"
                        className={styles.addAnswer}
                        disabled={!canAddAnswer}
                        loading={isSaving}
                        onClick={() => addTeacherQuestionAnswerAction(ctx)}
                    >
                        добавить ответ
                    </Button>

                    <div className={styles.spacer} />

                    <div className={styles.navigation}>
                        <Button
                            icon={<LeftOutlined />}
                            disabled={currentIndex === 0}
                            onClick={() => prevTeacherQuestionDraftAction(ctx)}
                        />

                        <Flex className={styles.questionButtons}>
                            {navigationItems.map((question, index) => (
                                <Button
                                    key={question.id}
                                    type={
                                        index === currentIndex
                                            ? 'primary'
                                            : 'default'
                                    }
                                    className={styles.questionNavButton}
                                    onClick={() =>
                                        setSelectedTeacherQuestionDraftIndexAction(
                                            ctx,
                                            index,
                                        )
                                    }
                                >
                                    {question.position}
                                </Button>
                            ))}
                        </Flex>

                        <Flex gap={8} className={styles.rightActions}>
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() => addTeacherQuestionDraftAction(ctx)}
                            />
                            <Button
                                icon={<RightOutlined />}
                                disabled={currentIndex === questions.length - 1}
                                onClick={() => nextTeacherQuestionDraftAction(ctx)}
                            />
                        </Flex>
                    </div>

                    <Flex justify="end" gap={12} className={styles.footer}>
                        <Button
                            onClick={() => closeAddQuestionModalAction(ctx)}
                        >
                            отмена
                        </Button>
                        <Button
                            type="primary"
                            loading={isSaving}
                            onClick={() => saveTeacherTestQuestionsAsync(ctx)}
                        >
                            сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </Modal>
    )
})
