import {
    reatomAsync,
    reatomResource,
    withDataAtom,
    withErrorAtom,
    withStatusesAtom,
} from '@reatom/framework'

import { studentCreatedAction } from '$modules/create-user-popover/create-user-popover.service'
import { createGroupAsync } from '$modules/students/ui/create-group-popover/create-group-popover.service.ts'

import { getStudents } from '$common/api/students/students.service'
import { deleteUser } from '$common/api/users/users.service'

export const studentsResource = reatomResource(async (ctx) => {
    ctx.spy(studentCreatedAction)
    ctx.spy(deleteStudentAsync.onFulfill)
    ctx.spy(createGroupAsync.onFulfill)

    return await getStudents()
}, 'studentsResource').pipe(withDataAtom([]), withStatusesAtom())

export const deleteStudentAsync = reatomAsync(
    (ctx, studentId: string) => {
        return ctx.schedule(async () => {
            await deleteUser(studentId)

            return studentId
        })
    },
    'deleteStudentAsync',
).pipe(withStatusesAtom(), withErrorAtom())
