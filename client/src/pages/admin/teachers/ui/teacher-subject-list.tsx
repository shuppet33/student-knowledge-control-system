import { Button, Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { selectSubjectAction } from '../model/teachers.actions.ts'
import { selectedSubjectIdAtom } from '../model/teachers.atoms.ts'

const subjects = [
    {
        id: '1',
        title: 'Математика',
    },
    {
        id: '2',
        title: 'Программирование',
    },
    {
        id: '3',
        title: 'Базы данных',
    },
]

export const TeacherSubjectList = reatomComponent(
    ({ ctx }) => {
        const selectedSubjectId = ctx.spy(
            selectedSubjectIdAtom,
        )

        return (
            <Flex vertical gap={12}>
                {subjects.map((subject) => {
                    const isSelected =
                        selectedSubjectId === subject.id

                    return (
                        <Button
                            key={subject.id}
                            size="large"
                            type={
                                isSelected
                                    ? 'primary'
                                    : 'default'
                            }
                            onClick={() =>
                                selectSubjectAction(
                                    ctx,
                                    subject.id,
                                )
                            }
                        >
                            {subject.title}
                        </Button>
                    )
                })}
            </Flex>
        )
    },
)