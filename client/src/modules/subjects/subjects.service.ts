import {
    reatomAsync,
    reatomResource,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import {
    createSubject,
    getSubjects,
} from '$common/api/subjects/subjects.service'

import {
    closeCreateSubjectAction,
    newSubjectNameAtom,
} from './subjects.state'

export const createSubjectAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const name = ctx.get(newSubjectNameAtom).trim()

        if (!name) {
            throw new Error('Введите название предмета')
        }

        const subject = await createSubject({ name })

        closeCreateSubjectAction(ctx)

        return subject
    })
}, 'createAdminSubjectAsync').pipe(withStatusesAtom(), withErrorAtom())

export const subjectsResource = reatomResource(async (ctx) => {
    ctx.spy(createSubjectAsync.onFulfill)

    return await getSubjects()
}, 'adminSubjectsResource').pipe(withDataAtom([]), withStatusesAtom())
