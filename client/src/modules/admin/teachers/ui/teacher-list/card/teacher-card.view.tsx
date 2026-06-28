import { reatomComponent } from '@reatom/npm-react'

import type { FC } from 'react'

import { EntityCard } from '$common/ui/entity-card'

import { deleteTeacherAsync } from '../../../teachers.service'
import { selectedTeacherAtom } from '../../../teachers.state'
import type { TeacherCardProps } from '../teacher-list.types'

export const TeacherCard: FC<TeacherCardProps> = reatomComponent(
    ({ ctx, teacher }) => {
        return (
            <EntityCard
                title={teacher.fullName}
                onClick={() => selectedTeacherAtom(ctx, teacher)}
                onDelete={() => deleteTeacherAsync(ctx, teacher.id)}
            />
        )
    },
)
