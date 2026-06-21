import { reatomAsync, withErrorAtom, withStatusesAtom } from '@reatom/framework'

import { createGroup } from '$common/api/groups/groups.service.ts'

import { closeCreateGroupAction, createGroupFormAtom } from './create-group-popover.state.ts'

export const createGroupAsync = reatomAsync((ctx) => {
    return ctx.schedule(async () => {
        const form = ctx.get(createGroupFormAtom)

        await createGroup(form.name)

        closeCreateGroupAction(ctx)

        return form.name
    })
}, 'createUserAsync').pipe(withStatusesAtom(), withErrorAtom())
