import { action, atom } from '@reatom/framework'

import type { Group } from '$common/api/groups/groups.types'
import type { Teacher } from '$common/api/teachers/teachers.types'

export const subjectIdAtom = atom(
    null as string | null,
    'subjectDetailsIdAtom',
)
export const subjectNameAtom = atom('', 'subjectDetailsNameAtom')

export const isGroupsPopoverOpenAtom = atom(
    false,
    'isSubjectGroupsPopoverOpenAtom',
)
export const isTeachersPopoverOpenAtom = atom(
    false,
    'isSubjectTeachersPopoverOpenAtom',
)

export const selectedGroupIdsAtom = atom<string[]>(
    [],
    'selectedSubjectGroupIdsAtom',
)
export const selectedTeacherIdsAtom = atom<string[]>(
    [],
    'selectedSubjectTeacherIdsAtom',
)

export const openGroupsPopoverAction = action(
    (ctx, groups: Group[]) => {
        selectedGroupIdsAtom(
            ctx,
            groups.map((group) => group.id),
        )
        isGroupsPopoverOpenAtom(ctx, true)
        isTeachersPopoverOpenAtom(ctx, false)
    },
    'openSubjectGroupsPopoverAction',
)

export const closeGroupsPopoverAction = action((ctx) => {
    isGroupsPopoverOpenAtom(ctx, false)
    selectedGroupIdsAtom(ctx, [])
}, 'closeSubjectGroupsPopoverAction')

export const openTeachersPopoverAction = action(
    (ctx, teachers: Teacher[]) => {
        selectedTeacherIdsAtom(
            ctx,
            teachers.map((teacher) => teacher.id),
        )
        isTeachersPopoverOpenAtom(ctx, true)
        isGroupsPopoverOpenAtom(ctx, false)
    },
    'openSubjectTeachersPopoverAction',
)

export const closeTeachersPopoverAction = action((ctx) => {
    isTeachersPopoverOpenAtom(ctx, false)
    selectedTeacherIdsAtom(ctx, [])
}, 'closeSubjectTeachersPopoverAction')

const toggleId = (ids: string[], id: string) => {
    return ids.includes(id)
        ? ids.filter((currentId) => currentId !== id)
        : [...ids, id]
}

export const toggleGroupAction = action((ctx, groupId: string) => {
    selectedGroupIdsAtom(
        ctx,
        toggleId(ctx.get(selectedGroupIdsAtom), groupId),
    )
}, 'toggleSubjectGroupAction')

export const toggleTeacherAction = action((ctx, teacherId: string) => {
    selectedTeacherIdsAtom(
        ctx,
        toggleId(ctx.get(selectedTeacherIdsAtom), teacherId),
    )
}, 'toggleSubjectTeacherAction')
