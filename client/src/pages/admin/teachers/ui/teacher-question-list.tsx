import { Button, Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import { openQuestionPreviewAction } from '../model/question-preview.actions.ts'

export const TeacherQuestionList: FC<{ questions: any }> = reatomComponent(
    ({ ctx, questions }) => {
        return (
            <Flex
                wrap
                gap={12}
                style={{
                    padding: '20px',
                }}
                onClick={(event) => {
                    event.stopPropagation()
                }}
            >
                {questions.map((question) => (
                    <Button
                        onClick={() =>
                            openQuestionPreviewAction(ctx, question.id)
                        }
                        key={question.id}
                        size="small"
                        style={{
                            width: 28,
                            height: 28,
                        }}
                    >
                        {question.id}
                    </Button>
                ))}
            </Flex>
        )
    },
)
