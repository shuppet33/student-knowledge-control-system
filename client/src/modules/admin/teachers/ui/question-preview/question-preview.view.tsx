import { Button, Flex, Modal } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { QuestionContent } from './content/question-content.view'
import { QuestionNavigation } from './navigation/question-navigation.view'
import { closeQuestionPreviewAction } from './question-preview.state'
import {
    isQuestionPreviewOpenAtom,
    selectedQuestionIdAtom,
} from './question-preview.state'
import type {
    Question,
} from './question-preview.types'

import styles from './question-preview.module.css'

type QuestionPreviewModalProps = {
    questions: Question[]
}

export const QuestionPreviewModal = reatomComponent<QuestionPreviewModalProps>(({
    ctx,
    questions,
}) => {
    const isOpen = ctx.spy(isQuestionPreviewOpenAtom)

    const selectedQuestionId = ctx.spy(selectedQuestionIdAtom)
    const selectedQuestion =
        questions.find((question) => question.id === selectedQuestionId) ??
        questions[0] ??
        null

    return (
        <Modal
            open={isOpen}
            footer={null}
            width={920}
            centered
            closeIcon={false}
        >
            <Flex
                justify="space-between"
                align="center"
                className={styles.header}
            >
                <Button
                    type="primary"
                    className={styles.questionButton}
                >
                    {selectedQuestion?.position ?? ''}
                </Button>

                <Button
                    icon={<CloseOutlined />}
                    onClick={() => closeQuestionPreviewAction(ctx)}
                />
            </Flex>
            <Flex
                vertical
                justify="space-between"
                className={styles.content}
            >
                {selectedQuestion && (
                    <QuestionContent
                        questionNumber={selectedQuestion.position}
                        questionText={selectedQuestion.text}
                        answers={selectedQuestion.answers}
                    />
                )}

                <QuestionNavigation
                    currentQuestion={selectedQuestionId}
                    questions={questions}
                />
            </Flex>
        </Modal>
    )
})
