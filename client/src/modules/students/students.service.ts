import { reatomResource, withDataAtom, withStatusesAtom } from '@reatom/framework'

import { studentCreatedAction } from '$modules/create-user-popover/create-user-popover.service'

import { getStudents } from '$common/api/students/students.service'

export const studentsResource = reatomResource(async (ctx) => {
    ctx.spy(studentCreatedAction)

    return await getStudents()
}, 'studentsResource').pipe(withDataAtom([]), withStatusesAtom())
