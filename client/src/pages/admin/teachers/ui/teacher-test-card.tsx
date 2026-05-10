import { Button, Card, Flex, Typography } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import { toggleTestAction } from '../model/teachers.actions.ts'
import { expandedTestIdAtom } from '../model/teachers.atoms.ts'

import { TeacherQuestionList } from './teacher-question-list'

const { Title } = Typography

type Test = {
    id: string
    subjectId: string
    title: string
    questions: number[]
}

export const TeacherTestCard: FC<{
    test: Test
}> = reatomComponent(({ ctx, test }) => {
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
                style={{
                    padding: '16px 20px',
                    borderBottom: isExpanded ? '1px solid #f0f0f0' : 'none',
                }}
            >
                <Title
                    level={4}
                    style={{
                        margin: 0,
                    }}
                >
                    {test.title}
                </Title>

                <Button
                    icon={<SettingOutlined />}
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                />
            </Flex>

            {isExpanded && <TeacherQuestionList questions={test.questions} />}
        </Card>
    )
})
