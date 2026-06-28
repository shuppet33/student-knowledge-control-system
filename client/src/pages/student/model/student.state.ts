import { atom } from '@reatom/framework'

import type { StudentTest } from '$common/api/students/students.types'

export const subjectIdAtom = atom(null as string | null, 'studentSubjectIdAtom')

export const selectedTestAtom = atom(
    null as StudentTest | null,
    'selectedStudentTestAtom',
)
