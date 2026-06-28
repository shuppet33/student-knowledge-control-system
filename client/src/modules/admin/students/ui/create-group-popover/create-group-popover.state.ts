import { action, atom } from '@reatom/framework'

import type { CreateGroupForm } from './create-group-popover.types.ts'

const initialForm: CreateGroupForm = {
    name: '',
}

export const isCreateGroupOpenAtom = atom(false, 'isCreateUserOpenAtom')

export const createGroupFormAtom = atom<CreateGroupForm>(initialForm, 'createUserFormAtom')

export const closeCreateGroupAction = action((ctx) => {
    isCreateGroupOpenAtom(ctx, false)
    createGroupFormAtom(ctx, initialForm)
}, 'closeCreateUserAction')

export const changeCreateGroupFieldAction = action(
    (
        ctx,
        payload: {
            field: keyof CreateGroupForm
            value: string
        }
    ) => {
        const form = ctx.get(createGroupFormAtom)

        createGroupFormAtom(ctx, {
            ...form,
            [payload.field]: payload.value,
        })
    },
    'changeCreateUserFieldAction'
)
