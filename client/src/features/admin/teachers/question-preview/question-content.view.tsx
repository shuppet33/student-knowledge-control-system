import { Card, Flex, Input } from 'antd'

import type { FC } from 'react'

import { QuestionAnswerCard } from './question-answer-card.view.tsx'
import type { QuestionContentProps } from './question-content.types.ts'

import styles from './question-content.module.css'

const { TextArea } = Input

export const QuestionContent: FC<QuestionContentProps> = ({ questionText, answers }) => {
    return (
        <Flex vertical gap={24}>
            <Card
                styles={{
                    body: {
                        padding: 12,
                    },
                }}
            >
                <TextArea
                    value={questionText}
                    readOnly
                    autoSize={false}
                    className={styles.textarea}
                />
            </Card>

            <Flex wrap gap={20}>
                {answers.map((answer) => (
                    <QuestionAnswerCard key={answer.id} answer={answer} />
                ))}
            </Flex>
        </Flex>
    )
}
