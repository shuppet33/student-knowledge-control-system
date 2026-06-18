import { Flex } from 'antd'

import type { FC } from 'react'

import { TeacherCard } from './card/teacher-card.view'
import type { TeacherListProps } from './teacher-list.types'

export const TeacherList: FC<TeacherListProps> = ({ teachers }) => {
    return (
        <Flex wrap gap={16}>
            {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
        </Flex>
    )
}
