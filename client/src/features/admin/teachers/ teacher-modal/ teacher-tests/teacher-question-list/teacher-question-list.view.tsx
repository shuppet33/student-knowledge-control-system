import { Button, Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import { openQuestionPreviewAction } from '$features/admin/teachers/question-preview/model/question-preview.actions.ts'

import type {
    TeacherQuestionListProps
} from './teacher-question-list.types.ts'

import styles from './teacher-question-list.module.css'

export const TeacherQuestionList: FC<TeacherQuestionListProps> = reatomComponent(
    ({ ctx, questions }) => {
        return (
            <Flex
                wrap
                gap={12}
                className={styles.questions}
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
                        className={styles.button}
                    >
                        {question.id}
                    </Button>
                ))}
            </Flex>
        )
    },
)
