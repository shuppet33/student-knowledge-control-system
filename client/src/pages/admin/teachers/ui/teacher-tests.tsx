import { Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { selectedSubjectIdAtom } from '../model/teachers.atoms.ts'

import { TeacherTestCard } from './teacher-test-card'

const tests = [
    {
        id: '1',
        subjectId: '1',
        title: 'Тест 1',
        questions: [1, 2, 3, 4, 5, 6],
    },
    {
        id: '2',
        subjectId: '1',
        title: 'Тест 2',
        questions: [],
    },
    {
        id: '3',
        subjectId: '2',
        title: 'Тест 3',
        questions: [],
    },
]

export const TeacherTests = reatomComponent(
    ({ ctx }) => {
        const selectedSubjectId = ctx.spy(
            selectedSubjectIdAtom,
        )

        const filteredTests = tests.filter(
            (test) =>
                test.subjectId === selectedSubjectId,
        )

        return (
            <Flex vertical gap={16}>
                {filteredTests.map((test) => (
                    <TeacherTestCard
                        key={test.id}
                        test={test}
                    />
                ))}
            </Flex>
        )
    },
)