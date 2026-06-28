import { action, atom } from '@reatom/framework'

import type {
    ChangeCreateUserFieldPayload,
    CreateUserForm,
} from './create-user-popover.types'

const initialForm: CreateUserForm = {
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
}

export const isCreateUserOpenAtom = atom(false, 'isCreateUserOpenAtom')

export const createUserFormAtom = atom<CreateUserForm>(
    initialForm,
    'createUserFormAtom',
)

export const closeCreateUserAction = action((ctx) => {
    isCreateUserOpenAtom(ctx, false)
    createUserFormAtom(ctx, initialForm)
}, 'closeCreateUserAction')

export const changeCreateUserFieldAction = action(
    (ctx, payload: ChangeCreateUserFieldPayload) => {
        const form = ctx.get(createUserFormAtom)

        createUserFormAtom(ctx, {
            ...form,
            [payload.field]: payload.value,
        })
    },
    'changeCreateUserFieldAction',
)
