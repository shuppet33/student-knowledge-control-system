import { Button, Card, Flex } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import {
    nextQuestionAction,
    prevQuestionAction,
} from '../question-preview.state'
import { selectedQuestionIdAtom } from '../question-preview.state'

import type { QuestionNavigationProps } from './question-navigation.types'

import styles from './question-navigation.module.css'

export const QuestionNavigation: FC<QuestionNavigationProps> = reatomComponent(
    ({ ctx, currentQuestion, questions }) => {
        return (
            <Card
                styles={{
                    body: {
                        padding: '10px 14px',
                    },
                }}
            >
                <Flex align="center" gap={12}>
                    <Button
                        icon={<LeftOutlined />}
                        onClick={() => prevQuestionAction(ctx, questions)}
                    />

                    <Flex gap={8} className={styles.questions}>
                        {questions.map((question) => (
                            <Button
                                key={question.id}
                                type={
                                    question.id === currentQuestion
                                        ? 'primary'
                                        : 'default'
                                }
                                className={styles.button}
                                onClick={() =>
                                    selectedQuestionIdAtom(ctx, question.id)
                                }
                            >
                                {question.id}
                            </Button>
                        ))}
                    </Flex>

                    <Button
                        icon={<RightOutlined />}
                        onClick={() => nextQuestionAction(ctx, questions)}
                    />
                </Flex>
            </Card>
        )
    },
)
