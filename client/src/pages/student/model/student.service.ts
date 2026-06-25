import { reatomResource, withDataAtom } from '@reatom/framework'

import { getMySubjects, getSubjectTests } from '$common/api/students/students.service.ts'

import { subjectIdAtom } from './student.state'

export const getMySubjectsResource = reatomResource(async () => {
    return await getMySubjects()
}).pipe(withDataAtom([]))

export const getSubjectTestsResource = reatomResource(async (ctx) => {
    const subjectId = ctx.spy(subjectIdAtom)

    if (!subjectId) {
        return {
            subject: null,
            tests: [],
        }
    }

    return getSubjectTests(subjectId)
}).pipe(
    withDataAtom({
        subject: null,
        tests: [],
    }),
)
