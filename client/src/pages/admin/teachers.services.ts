import {
    reatomResource,
    withDataAtom,
    withStatusesAtom,
} from '@reatom/framework'

import { getTeachers } from '$shared/api/admin/teachers/teachers.api'

export const teachersResource = reatomResource(async () => {
    return await getTeachers()
}, 'teachersResource').pipe(withDataAtom([]), withStatusesAtom())
