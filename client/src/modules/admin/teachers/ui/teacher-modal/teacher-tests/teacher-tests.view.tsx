import { Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { teacherTestsResource } from '../../../teachers.service'

import { TeacherTestCard } from './teacher-test-card/teacher-test-card.view'

export const TeacherTests = reatomComponent(({ ctx }) => {
    const tests = ctx.spy(teacherTestsResource.dataAtom)

    return (
        <Flex vertical gap={16}>
            {tests.map((test) => (
                <TeacherTestCard key={test.id} test={test} />
            ))}
        </Flex>
    )
})
