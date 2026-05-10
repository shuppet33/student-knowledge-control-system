import { Button, Card, Flex } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import { selectedQuestionIdAtom } from '$pages/admin/teachers/model/question-preview.atoms.ts'

import {
    nextQuestionAction,
    prevQuestionAction,
} from '../model/question-preview.actions.ts'

export const QuestionNavigation: FC<{ currentQuestion: any; questions: any }> =
    reatomComponent(({ ctx, currentQuestion, questions }) => {
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

                    <Flex
                        gap={8}
                        style={{
                            flex: 1,
                            overflow: 'hidden',
                        }}
                    >
                        {questions.map((question) => (
                            <Button
                                key={question.id}
                                type={
                                    question.id === currentQuestion
                                        ? 'primary'
                                        : 'default'
                                }
                                style={{
                                    minWidth: 40,
                                }}
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
    })
