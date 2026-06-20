import { Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { ButtonUI } from '$common/ui/button'
import { LoaderUI } from '$common/ui/loader'

import { deleteTeacherSubjectAsync, teacherSubjectsResource } from '../../../teachers.service'
import {
    selectedSubjectAtom,
    selectSubjectAction,
} from '../../../teachers.state'

import styles from './subject-list.module.css'

export const TeacherSubjectList = reatomComponent(({ ctx }) => {
    const subjects = ctx.spy(teacherSubjectsResource.dataAtom)
    const { isPending } = ctx.spy(teacherSubjectsResource.statusesAtom)

    const selectedSubject = ctx.spy(selectedSubjectAtom)

    if (isPending) {
        return (
            <Flex vertical align="center" justify="center">
                <LoaderUI />
            </Flex>
        )
    }

    return (
        <Flex vertical gap={12} className={styles.subjectsList}>
            {subjects.map((subject) => (
                <ButtonUI
                    key={subject.id}
                    title={subject.name}
                    active={selectedSubject.id === subject.id}
                    onClick={() => selectSubjectAction(ctx, subject)}
                    onDelete={() => deleteTeacherSubjectAsync(ctx, subject.id)}
                >
                    {subject.name}
                </ButtonUI>
            ))}
        </Flex>
    )
})
