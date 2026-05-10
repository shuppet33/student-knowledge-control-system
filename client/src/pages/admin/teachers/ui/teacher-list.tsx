import { Flex } from 'antd'

import { TeacherCard } from './teacher-card'

export const TeacherList = ({ teachers }) => {
    return (
        <Flex wrap gap={16}>
            {teachers.map((teacher) => (
                <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                />
            ))}
        </Flex>
    )
}