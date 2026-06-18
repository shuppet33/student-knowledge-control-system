import { Button, Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { teacherSubjectsResource } from '../../../teachers.service'
import { selectSubjectAction } from '../../../teachers.state'
import { selectedSubjectIdAtom } from '../../../teachers.state'

export const TeacherSubjectList = reatomComponent(({ ctx }) => {
    const subjects = ctx.spy(teacherSubjectsResource.dataAtom)
    const selectedSubjectId = ctx.spy(selectedSubjectIdAtom)

    return (
        <Flex vertical gap={12}>
            {subjects.map((subject) => {
                const isSelected = selectedSubjectId === subject.id

                return (
                    <Button
                        key={subject.id}
                        size="large"
                        type={isSelected ? 'primary' : 'default'}
                        onClick={() => selectSubjectAction(ctx, subject.id)}
                    >
                        {subject.name}
                    </Button>
                )
            })}
        </Flex>
    )
})
