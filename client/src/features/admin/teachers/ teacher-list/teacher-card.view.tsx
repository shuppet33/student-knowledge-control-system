import { Card, Typography } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import { openTeacherModalAction } from '../teachers.actions.ts'

import type { TeacherCardProps } from './teacher-list.types.ts'

import styles from './teacher-list.module.css'

const { Title } = Typography

export const TeacherCard: FC<TeacherCardProps> = reatomComponent(
    ({ ctx, teacher }) => {
        return (
            <Card
                hoverable
                size="small"
                className={styles.card}
                onClick={() => openTeacherModalAction(ctx, teacher)}
            >
                <Title
                    level={5}
                    className={styles.title}
                >
                    {teacher.fullName}
                </Title>
            </Card>
        )
    },
)
