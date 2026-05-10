import { Button, Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { selectSubjectAction } from '../model/teachers.actions.ts'
import { selectedSubjectIdAtom } from '../model/teachers.atoms.ts'
import { teacherSubjectsResource } from '../model/teachers.services.ts'

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
