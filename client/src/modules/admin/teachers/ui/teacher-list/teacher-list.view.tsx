import type { FC } from 'react'

import { TeacherCard } from './card/teacher-card.view'
import type { TeacherListProps } from './teacher-list.types'

import styles from './teacher-list.module.css'

export const TeacherList: FC<TeacherListProps> = ({ teachers }) => {
    return (
        <div className={styles.list}>
            {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
        </div>
    )
}
