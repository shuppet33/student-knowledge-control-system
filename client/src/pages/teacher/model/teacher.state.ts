import { action, atom } from '@reatom/framework'

import { closeQuestionPreviewAction } from '$modules/admin/teachers/ui/question-preview/question-preview.state'

import type {
    TeacherSubjectTest,
    TeacherTestQuestion,
} from '$common/api/teacher/teacher.types'

import {
    assignSubjectToMeAsync,
    createSubjectAndAssignToMeAsync,
} from './teacher.service'

export const isAddSubjectOpenAtom = atom(false, 'isTeacherAddSubjectOpenAtom')
export const subjectIdAtom = atom(null as string | null, 'teacherSubjectIdAtom')
export const subjectNameAtom = atom('', 'teacherSubjectNameAtom')
export const selectedGroupIdsAtom = atom<string[]>(
    [],
    'selectedTeacherSubjectGroupIdsAtom',
)
export const isCreateTestModalOpenAtom = atom(
    false,
    'isCreateTeacherTestModalOpenAtom',
)
export const isEditTestModalOpenAtom = atom(
    false,
    'isEditTeacherTestModalOpenAtom',
)
export const isAddQuestionModalOpenAtom = atom(
    false,
    'isAddTeacherQuestionModalOpenAtom',
)
export const selectedTeacherTestAtom = atom(
    null as TeacherSubjectTest | null,
    'selectedTeacherTestAtom',
)
export const teacherTestTitleAtom = atom('', 'teacherTestTitleAtom')
export const selectedTeacherTestGroupIdsAtom = atom<string[]>(
    [],
    'selectedTeacherTestGroupIdsAtom',
)
export const selectedNewSubjectIdAtom = atom(
    undefined as string | undefined,
    'selectedTeacherNewSubjectIdAtom',
)
export const newSubjectNameAtom = atom('', 'teacherNewSubjectNameAtom')
export type TeacherQuestionDraftAnswer = {
    id: string
    text: string
    isCorrect: boolean
}

export type TeacherQuestionDraft = {
    id: string
    text: string
    answers: TeacherQuestionDraftAnswer[]
}

export const teacherQuestionDraftsAtom = atom<TeacherQuestionDraft[]>(
    [],
    'teacherQuestionDraftsAtom',
)
export const selectedTeacherQuestionDraftIndexAtom = atom(
    0,
    'selectedTeacherQuestionDraftIndexAtom',
)

const createDraftId = (): string => {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const createQuestionDraft = (): TeacherQuestionDraft => ({
    id: createDraftId(),
    text: '',
    answers: [],
})

const createAnswerDraft = (): TeacherQuestionDraftAnswer => ({
    id: createDraftId(),
    text: '',
    isCorrect: false,
})

const createQuestionDrafts = (
    questions: TeacherTestQuestion[],
): TeacherQuestionDraft[] => {
    const existingQuestions = questions
        .toSorted((first, second) => first.position - second.position)
        .map((question): TeacherQuestionDraft => ({
            id: question.id,
            text: question.text,
            answers: question.answers.map((answer) => ({
                id: answer.id,
                text: answer.text,
                isCorrect: answer.isCorrect,
            })),
        }))

    return [...existingQuestions, createQuestionDraft()]
}

export const openAddSubjectAction = action((ctx) => {
    isAddSubjectOpenAtom(ctx, true)
}, 'openTeacherAddSubjectAction')

export const closeAddSubjectAction = action((ctx) => {
    isAddSubjectOpenAtom(ctx, false)
    selectedNewSubjectIdAtom(ctx, undefined)
    newSubjectNameAtom(ctx, '')

    createSubjectAndAssignToMeAsync.errorAtom.reset(ctx)
    createSubjectAndAssignToMeAsync.statusesAtom.reset(ctx)
    assignSubjectToMeAsync.errorAtom.reset(ctx)
    assignSubjectToMeAsync.statusesAtom.reset(ctx)
}, 'closeTeacherAddSubjectAction')

export const changeSelectedSubjectAction = action((ctx, value: string) => {
    selectedNewSubjectIdAtom(ctx, value)
    newSubjectNameAtom(ctx, '')
}, 'changeTeacherSelectedSubjectAction')

export const changeNewSubjectNameAction = action((ctx, value: string) => {
    newSubjectNameAtom(ctx, value)
    selectedNewSubjectIdAtom(ctx, undefined)
}, 'changeTeacherNewSubjectNameAction')

export const setSelectedGroupIdsAction = action(
    (ctx, groupIds: string[]) => {
        selectedGroupIdsAtom(ctx, groupIds)
    },
    'setSelectedTeacherSubjectGroupIdsAction',
)

export const openCreateTestModalAction = action((ctx) => {
    isCreateTestModalOpenAtom(ctx, true)
}, 'openCreateTeacherTestModalAction')

export const closeCreateTestModalAction = action((ctx) => {
    isCreateTestModalOpenAtom(ctx, false)
}, 'closeCreateTeacherTestModalAction')

export const openEditTestModalAction = action((
    ctx,
    test: TeacherSubjectTest,
) => {
    selectedTeacherTestAtom(ctx, test)
    teacherTestTitleAtom(ctx, test.title)
    selectedTeacherTestGroupIdsAtom(ctx, test.groupIds)
    isEditTestModalOpenAtom(ctx, true)
}, 'openEditTeacherTestModalAction')

export const closeEditTestModalAction = action((ctx) => {
    isEditTestModalOpenAtom(ctx, false)
    selectedTeacherTestAtom(ctx, null)
    teacherTestTitleAtom(ctx, '')
    selectedTeacherTestGroupIdsAtom(ctx, [])
    isAddQuestionModalOpenAtom(ctx, false)
    teacherQuestionDraftsAtom(ctx, [])
    selectedTeacherQuestionDraftIndexAtom(ctx, 0)
    closeQuestionPreviewAction(ctx)
}, 'closeEditTeacherTestModalAction')

export const changeTeacherTestTitleAction = action((ctx, value: string) => {
    teacherTestTitleAtom(ctx, value)
}, 'changeTeacherTestTitleAction')

export const openAddQuestionModalAction = action((
    ctx,
    questions: TeacherTestQuestion[],
) => {
    const drafts = createQuestionDrafts(questions)

    teacherQuestionDraftsAtom(ctx, drafts)
    selectedTeacherQuestionDraftIndexAtom(ctx, drafts.length - 1)
    isAddQuestionModalOpenAtom(ctx, true)
}, 'openAddTeacherQuestionModalAction')

export const closeAddQuestionModalAction = action((ctx) => {
    isAddQuestionModalOpenAtom(ctx, false)
    teacherQuestionDraftsAtom(ctx, [])
    selectedTeacherQuestionDraftIndexAtom(ctx, 0)
}, 'closeAddTeacherQuestionModalAction')

export const changeTeacherQuestionTextAction = action((ctx, text: string) => {
    const currentIndex = ctx.get(selectedTeacherQuestionDraftIndexAtom)

    teacherQuestionDraftsAtom(
        ctx,
        ctx.get(teacherQuestionDraftsAtom).map((question, index) =>
            index === currentIndex
                ? {
                    ...question,
                    text,
                }
                : question,
        ),
    )
}, 'changeTeacherQuestionTextAction')

export const addTeacherQuestionAnswerAction = action((ctx) => {
    const currentIndex = ctx.get(selectedTeacherQuestionDraftIndexAtom)
    const drafts = ctx.get(teacherQuestionDraftsAtom)
    const currentQuestion = drafts[currentIndex]

    if (!currentQuestion || currentQuestion.answers.length >= 4) {
        return
    }

    teacherQuestionDraftsAtom(
        ctx,
        drafts.map((question, index) =>
            index === currentIndex
                ? {
                    ...question,
                    answers: [...question.answers, createAnswerDraft()],
                }
                : question,
        ),
    )
}, 'addTeacherQuestionAnswerAction')

export const changeTeacherQuestionAnswerAction = action((
    ctx,
    answerId: string,
    patch: Partial<TeacherQuestionDraftAnswer>,
) => {
    const currentIndex = ctx.get(selectedTeacherQuestionDraftIndexAtom)

    teacherQuestionDraftsAtom(
        ctx,
        ctx.get(teacherQuestionDraftsAtom).map((question, index) =>
            index === currentIndex
                ? {
                    ...question,
                    answers: question.answers.map((answer) =>
                        answer.id === answerId
                            ? {
                                ...answer,
                                ...patch,
                            }
                            : answer,
                    ),
                }
                : question,
        ),
    )
}, 'changeTeacherQuestionAnswerAction')

export const deleteTeacherQuestionAnswerAction = action((
    ctx,
    answerId: string,
) => {
    const currentIndex = ctx.get(selectedTeacherQuestionDraftIndexAtom)

    teacherQuestionDraftsAtom(
        ctx,
        ctx.get(teacherQuestionDraftsAtom).map((question, index) =>
            index === currentIndex
                ? {
                    ...question,
                    answers: question.answers.filter(
                        (answer) => answer.id !== answerId,
                    ),
                }
                : question,
        ),
    )
}, 'deleteTeacherQuestionAnswerAction')

export const addTeacherQuestionDraftAction = action((ctx) => {
    const drafts = ctx.get(teacherQuestionDraftsAtom)

    teacherQuestionDraftsAtom(ctx, [...drafts, createQuestionDraft()])
    selectedTeacherQuestionDraftIndexAtom(ctx, drafts.length)
}, 'addTeacherQuestionDraftAction')

export const deleteTeacherQuestionDraftAction = action((ctx) => {
    const drafts = ctx.get(teacherQuestionDraftsAtom)
    const currentIndex = ctx.get(selectedTeacherQuestionDraftIndexAtom)

    if (drafts.length <= 1) {
        return
    }

    teacherQuestionDraftsAtom(
        ctx,
        drafts.filter((_, index) => index !== currentIndex),
    )
    selectedTeacherQuestionDraftIndexAtom(ctx, Math.max(currentIndex - 1, 0))
}, 'deleteTeacherQuestionDraftAction')

export const setSelectedTeacherQuestionDraftIndexAction = action((
    ctx,
    index: number,
) => {
    const drafts = ctx.get(teacherQuestionDraftsAtom)

    selectedTeacherQuestionDraftIndexAtom(
        ctx,
        Math.min(Math.max(index, 0), Math.max(drafts.length - 1, 0)),
    )
}, 'setSelectedTeacherQuestionDraftIndexAction')

export const prevTeacherQuestionDraftAction = action((ctx) => {
    setSelectedTeacherQuestionDraftIndexAction(
        ctx,
        ctx.get(selectedTeacherQuestionDraftIndexAtom) - 1,
    )
}, 'prevTeacherQuestionDraftAction')

export const nextTeacherQuestionDraftAction = action((ctx) => {
    setSelectedTeacherQuestionDraftIndexAction(
        ctx,
        ctx.get(selectedTeacherQuestionDraftIndexAtom) + 1,
    )
}, 'nextTeacherQuestionDraftAction')

export const setSelectedTeacherTestGroupIdsAction = action(
    (ctx, groupIds: string[]) => {
        selectedTeacherTestGroupIdsAtom(ctx, groupIds)
    },
    'setSelectedTeacherTestGroupIdsAction',
)
