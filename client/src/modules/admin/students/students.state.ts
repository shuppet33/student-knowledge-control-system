import { withConcurrency } from '@reatom/effects'
import { action, atom } from '@reatom/framework'
import { sleep } from '@reatom/utils'

export const selectedGroupKeyAtom = atom(
    null as string | null,
    'selectedGroupKeyAtom',
)
export const isAddStudentOpenAtom = atom(false, 'isAddStudentOpenAtom')
export const selectedStudentIdsAtom = atom(
    [] as string[],
    'selectedStudentIdsAtom',
)
export const addStudentSearchAtom = atom('', 'addStudentSearchAtom')

export const debouncedAddStudentSearchAction = action(
    async (ctx, value: string) => {
        await ctx.schedule(() => sleep(350))
        addStudentSearchAtom(ctx, value)
    },
    'debouncedAddStudentSearchAction',
).pipe(withConcurrency())

export const resetAddStudentPopoverAction = action((ctx) => {
    isAddStudentOpenAtom(ctx, false)
    selectedStudentIdsAtom(ctx, [])
    addStudentSearchAtom(ctx, '')
}, 'resetAddStudentPopoverAction')
