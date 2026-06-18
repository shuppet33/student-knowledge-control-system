import { Button, Flex, Modal } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { questions } from '../../teachers.mock'

import { QuestionContent } from './content/question-content.view'
import { QuestionNavigation } from './navigation/question-navigation.view'
import { closeQuestionPreviewAction } from './question-preview.state'
import {
    isQuestionPreviewOpenAtom,
    selectedQuestionIdAtom,
} from './question-preview.state'

import styles from './question-preview.module.css'

export const QuestionPreviewModal = reatomComponent(({ ctx }) => {
    const isOpen = ctx.spy(isQuestionPreviewOpenAtom)

    const selectedQuestionId = ctx.spy(selectedQuestionIdAtom)

    const selectedQuestion =
        questions.find((question) => question.id === selectedQuestionId) ??
        questions[0]

    return (
        <Modal
            open={isOpen}
            footer={null}
            width={820}
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
                    {selectedQuestion.id}
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
                <QuestionContent
                    questionNumber={selectedQuestion.id}
                    questionText={selectedQuestion.text}
                    answers={selectedQuestion.answers}
                />

                <QuestionNavigation
                    currentQuestion={selectedQuestion.id}
                    questions={questions}
                />
            </Flex>
        </Modal>
    )
})
