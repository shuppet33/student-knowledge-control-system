import {
    type CreateTeacherDto,
    type CreateTeacherPayload,
    type Teacher,
    type TeacherDto,
} from './teachers.types'

export const teachersMapper = (teachers: TeacherDto[]): Teacher[] => {
    return teachers.map((teacher) => ({
        id: teacher.id,
        fullName: teacher.full_name,
        email: teacher.email,
    }))
}

export const mapCreateTeacherPayloadToDto = (
    payload: CreateTeacherPayload,
): CreateTeacherDto => {
    return {
        email: payload.email,
        password: payload.password,
        role: 'teacher',
        full_name: payload.fullName,
    }
}
