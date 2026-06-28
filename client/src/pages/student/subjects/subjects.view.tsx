import { Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useNavigate } from 'react-router'

import { getMySubjectsResource } from '$pages/student/model/student.service.ts'

import { SubjectCard } from './subject-card.view'

import styles from './subjects.module.css'

export const StudentPage = reatomComponent(({ ctx }) => {
    const navigate = useNavigate()
    const subjects = ctx.spy(getMySubjectsResource.dataAtom)

    return (
        <Flex vertical gap={24}>
            <div className={styles.list}>
                {subjects?.map((subject) => (
                    <SubjectCard
                        key={subject.id}
                        subject={subject}
                        onClick={() => navigate(`/student/${subject.id}`)}
                    />
                ))}
            </div>
        </Flex>
    )
})
