import { atom } from '@reatom/framework'

import type { Teacher } from '$shared/api/admin/teachers/teachers.types.ts'

export const selectedTeacherAtom = atom<Teacher | null>(
    null,
    'selectedTeacherAtom',
)

export const selectedSubjectIdAtom = atom<string | null>(
    null,
    'selectedSubjectIdAtom',
)

export const expandedTestIdAtom = atom<string | null>(
    null,
    'expandedTestIdAtom',
)


export const isAddSubjectOpenAtom = atom(
    false,
    'isAddSubjectOpenAtom',
)

export const selectedNewSubjectIdAtom = atom<
    string | undefined
>(
    undefined,
    'selectedNewSubjectIdAtom',
)

export const newSubjectNameAtom = atom(
    '',
    'newSubjectNameAtom',
)
