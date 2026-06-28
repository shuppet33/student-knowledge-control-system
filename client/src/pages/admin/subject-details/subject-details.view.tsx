import { useLoaderData } from 'react-router'

import type { SubjectLoaderData } from '$app/router/router.view'

import { SubjectDetails } from '$modules/admin/subject-details'

export const AdminSubjectDetailsPage = () => {
    const { subjectId } = useLoaderData<SubjectLoaderData>()

    if (!subjectId) {
        return null
    }

    return <SubjectDetails subjectId={subjectId} key={subjectId} />
}
