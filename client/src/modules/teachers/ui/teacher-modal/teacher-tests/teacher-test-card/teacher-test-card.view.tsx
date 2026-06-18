import { Button, Card, Flex, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import { questions } from '../../../../teachers.mock'
import { toggleTestAction } from '../../../../teachers.state'
import { expandedTestIdAtom } from '../../../../teachers.state'
import { TeacherQuestionList } from '../teacher-question-list/teacher-question-list.view'

import type { TeacherTestCardProps } from './teacher-test-card.types'

import styles from './teacher-test-card.module.css'

const { Title } = Typography

export const TeacherTestCard: FC<TeacherTestCardProps> = reatomComponent(({ ctx, test }) => {
    const expandedTestId = ctx.spy(expandedTestIdAtom)

    const isExpanded = expandedTestId === test.id

    return (
        <Card
            hoverable
            styles={{
                body: {
                    padding: 0,
                },
            }}
            onClick={() => toggleTestAction(ctx, test.id)}
        >
            <Flex
                justify="space-between"
                align="center"
                className={styles.header}
            >
                <Title
                    level={4}
                    className={styles.title}
                >
                    {test.title}
                </Title>

                <Button
                    icon={<InfoCircleOutlined />}
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                />
            </Flex>

            {isExpanded && <TeacherQuestionList questions={questions} />}
        </Card>
    )
})
