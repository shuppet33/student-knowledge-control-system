import { atom } from '@reatom/framework'

export const subjectIdAtom = atom(null as string | null, 'studentSubjectIdAtom')

export const selectedTestIdAtom = atom(
    null as string | null,
    'selectedStudentTestIdAtom',
)
