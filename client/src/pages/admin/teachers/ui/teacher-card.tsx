import { Card, Typography } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import type { Teacher } from '$shared/api/admin/teachers/teachers.types.ts'

import { openTeacherModalAction } from '../model/teachers.actions.ts'

const { Title } = Typography

export const TeacherCard: FC<{ teacher: Teacher }> = reatomComponent(
    ({ ctx, teacher }) => {
        return (
            <Card
                hoverable
                size="small"
                style={{
                    width: 180,
                    cursor: 'pointer',
                }}
                onClick={() => openTeacherModalAction(ctx, teacher)}
            >
                <Title
                    level={5}
                    style={{
                        margin: 0,
                    }}
                >
                    {teacher.fullName}
                </Title>
            </Card>
        )
    },
)
