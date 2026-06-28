import { Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useNavigate } from 'react-router'

import { getMyTeacherSubjectsResource } from '$pages/teacher/model/teacher.service.ts'
import { AddSubjectPopover } from '$pages/teacher/ui/add-subject-popover'

import { EntityCard } from '$common/ui/entity-card'

import styles from './teacher.module.css'

export const TeacherPage = reatomComponent(({ ctx }) => {
    const navigate = useNavigate()
    const subjects = ctx.spy(getMyTeacherSubjectsResource.dataAtom)

    return (
        <Flex vertical gap={24}>
            <Flex gap={10}>
                <AddSubjectPopover />
            </Flex>

            <div className={styles.list}>
                {subjects?.map((subject) => (
                    <EntityCard
                        key={subject.id}
                        title={subject.name}
                        onClick={() => navigate(`/teacher/${subject.id}`)}
                    />
                ))}
            </div>
        </Flex>
    )
})
