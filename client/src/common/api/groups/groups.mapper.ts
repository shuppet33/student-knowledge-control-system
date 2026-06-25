import type {
    AddStudentsToGroupDto,
    AddStudentsToGroupPayload,
} from './groups.types'

export const mapAddStudentsToGroupPayloadToDto = (
    payload: AddStudentsToGroupPayload,
): AddStudentsToGroupDto => {
    return {
        student_ids: payload.studentIds,
    }
}
