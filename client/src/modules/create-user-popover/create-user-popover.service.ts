import {
    action,
    reatomAsync,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import { createUser } from '$common/api/users/users.service'
import type { CreatableUserRole } from '$common/api/users/users.types'

import {
    closeCreateUserAction,
    createUserFormAtom,
} from './create-user-popover.state'

export const teacherCreatedAction = action(
    () => {},
    'teacherCreatedAction',
)

export const studentCreatedAction = action(
    () => {},
    'studentCreatedAction',
)

export const createUserAsync = reatomAsync(
    (ctx, role: CreatableUserRole) => {
        return ctx.schedule(async () => {
            const form = ctx.get(createUserFormAtom)

            if (form.password !== form.repeatPassword) {
                throw new Error('Пароли не совпадают')
            }

            await createUser({
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                role,
            })

            if (role === 'teacher') {
                teacherCreatedAction(ctx)
            } else {
                studentCreatedAction(ctx)
            }

            closeCreateUserAction(ctx)

            return role
        })
    },
    'createUserAsync',
).pipe(withStatusesAtom(), withErrorAtom())
