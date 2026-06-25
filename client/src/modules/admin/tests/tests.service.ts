import {
    reatomAsync,
    reatomResource,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import {
    deleteTest,
    getTests,
} from '$common/api/tests/tests.service'

export const deleteTestAsync = reatomAsync((ctx, testId: string) => {
    return ctx.schedule(async () => {
        await deleteTest(testId)

        return testId
    })
}, 'deleteAdminTestAsync').pipe(withStatusesAtom(), withErrorAtom())

export const testsResource = reatomResource(async (ctx) => {
    ctx.spy(deleteTestAsync.onFulfill)

    return await getTests()
}, 'adminTestsResource').pipe(withDataAtom([]), withStatusesAtom())
