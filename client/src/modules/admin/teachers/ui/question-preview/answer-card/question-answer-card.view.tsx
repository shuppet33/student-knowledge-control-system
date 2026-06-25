import { Card } from 'antd'

import type { FC } from 'react'

import type { QuestionAnswerCardProps } from './question-answer-card.types'

import styles from './question-answer-card.module.css'

export const QuestionAnswerCard: FC<QuestionAnswerCardProps> = ({ answer }) => {
    return (
        <Card
            className={`${styles.card} ${
                answer.isCorrect ? styles.correct : ''
            }`}
            styles={{
                body: {
                    padding: '16px 20px',
                },
            }}
        >
            <div className={styles.text}>
                {answer.id}. {answer.text}
            </div>
        </Card>
    )
}
