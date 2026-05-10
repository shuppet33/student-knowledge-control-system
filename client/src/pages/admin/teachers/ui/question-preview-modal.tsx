import { Button, Flex, Modal } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { closeQuestionPreviewAction } from '../model/question-preview.actions.ts'
import {
    isQuestionPreviewOpenAtom,
    selectedQuestionIdAtom,
} from '../model/question-preview.atoms.ts'

import { QuestionContent } from './question-content'
import { QuestionNavigation } from './question-navigation'

const questions = [
    {
        id: 1,
        text: 'Что такое SQL?',
        answers: [
            {
                id: 1,
                text: 'Язык запросов к базе данных',
                isCorrect: true,
            },
            {
                id: 2,
                text: 'Язык разметки',
                isCorrect: false,
            },
            {
                id: 3,
                text: 'Фреймворк',
                isCorrect: false,
            },
            {
                id: 4,
                text: 'Операционная система',
                isCorrect: false,
            },
        ],
    },
    {
        id: 2,
        text: 'Что такое React?',
        answers: [
            {
                id: 1,
                text: 'Библиотека для UI',
                isCorrect: true,
            },
            {
                id: 2,
                text: 'База данных',
                isCorrect: false,
            },
            {
                id: 3,
                text: 'Язык программирования',
                isCorrect: false,
            },
            {
                id: 4,
                text: 'Сервер',
                isCorrect: false,
            },
        ],
    },
    {
        id: 3,
        text: 'Что делает PRIMARY KEY?',
        answers: [
            {
                id: 1,
                text: 'Уникально идентифицирует запись',
                isCorrect: true,
            },
            {
                id: 2,
                text: 'Удаляет таблицу',
                isCorrect: false,
            },
            {
                id: 3,
                text: 'Создает индекс',
                isCorrect: false,
            },
            {
                id: 4,
                text: 'Шифрует данные',
                isCorrect: false,
            },
        ],
    },
    {
        id: 4,
        text: 'Какой HTTP метод используется для получения данных?',
        answers: [
            {
                id: 1,
                text: 'GET',
                isCorrect: true,
            },
            {
                id: 2,
                text: 'POST',
                isCorrect: false,
            },
            {
                id: 3,
                text: 'DELETE',
                isCorrect: false,
            },
            {
                id: 4,
                text: 'PATCH',
                isCorrect: false,
            },
        ],
    },
]

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
                style={{
                    marginBottom: 20,
                }}
            >
                <Button
                    type="primary"
                    style={{
                        width: 40,
                    }}
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
                style={{
                    minHeight: 680,
                }}
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
