import { Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useNavigate } from 'react-router'

import { getMySubjectsResource } from '$pages/student/model/student.service.ts'

import { EntityCard } from '$common/ui/entity-card'

import styles from './subjects.module.css'

export const StudentPage = reatomComponent(({ ctx }) => {
    const navigate = useNavigate()
    const subjects = ctx.spy(getMySubjectsResource.dataAtom)

    return (
        <Flex vertical gap={24}>
            <div className={styles.list}>
                {subjects?.map((subject) => (
                    <EntityCard
                        key={subject.id}
                        title={subject.name}
                        onClick={() => navigate(`/student/${subject.id}`)}
                    />
                ))}
            </div>
        </Flex>
    )
})
