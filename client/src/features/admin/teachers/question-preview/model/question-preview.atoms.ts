import { atom } from '@reatom/framework'

export const isQuestionPreviewOpenAtom = atom(
    false,
    'isQuestionPreviewOpenAtom',
)

export const selectedQuestionIdAtom = atom<number | null>(
    null,
    'selectedQuestionIdAtom',
)

export const selectedQuestionPageAtom = atom(0, 'selectedQuestionPageAtom')
