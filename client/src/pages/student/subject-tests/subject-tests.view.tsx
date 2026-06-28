import { Button, Checkbox, Flex, Radio } from 'antd'
import { CheckOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { useLoaderData } from 'react-router'

import type { StudentSubjectTestsLoaderData } from '$app/router/router.view'

import {
    finishStudentAttemptAsync,
    getSubjectTestsResource,
    saveStudentAnswerAsync,
    selectStudentTestAsync,
    startStudentTestAsync,
} from '$pages/student/model/student.service.ts'
import {
    activeStudentTestAtom,
    currentQuestionIndexAtom,
    nextQuestionAction,
    openStudentSubjectAction,
    prevQuestionAction,
    selectedTestAtom,
} from '$pages/student/model/student.state.ts'

import { TestCard } from './test-card.view'

import styles from './subject-tests.module.css'

export const SubjectTestsPage = reatomComponent(({ ctx }) => {
    const loaderData = useLoaderData<StudentSubjectTestsLoaderData>()
    const subjectTests = ctx.spy(getSubjectTestsResource.dataAtom)
    const subject = subjectTests.subject ?? loaderData.subject
    const tests = subjectTests.subject ? subjectTests.tests : loaderData.tests

    if (subject) {
        openStudentSubjectAction(ctx, subject.id)
    }

    const selectedTest = ctx.spy(selectedTestAtom)
    const activeTest = ctx.spy(activeStudentTestAtom)
    const currentQuestionIndex = ctx.spy(currentQuestionIndexAtom)
    const { isPending: isStartingTest } = ctx.spy(
        startStudentTestAsync.statusesAtom,
    )
    const { isPending: isFinishingTest } = ctx.spy(
        finishStudentAttemptAsync.statusesAtom,
    )
    const currentQuestion = activeTest?.questions[currentQuestionIndex]
    const isLastQuestion =
        activeTest !== null &&
        currentQuestionIndex === activeTest.questions.length - 1

    return (
        <Flex className={styles.page} vertical gap={20}>
            <Flex className={styles.title}>{subject?.name}</Flex>

            <Flex className={styles.content} gap={20}>
                <Flex className={styles.testList} vertical gap={20}>
                    {tests.length === 0 && (
                        <div className={styles.emptyText}>доступных тестов нет</div>
                    )}

                    {tests.map((test) => (
                        <TestCard
                            key={test.id}
                            title={test.title}
                            metrics={test.metrics}
                            score={test.score}
                            dateOfAppointment={test.dateOfAppointment}
                            isSelected={selectedTest?.id === test.id}
                            onClick={() => selectStudentTestAsync(ctx, test)}
                        />
                    ))}
                </Flex>

                <div className={styles.testView}>
                    {!selectedTest && (
                        <div className={styles.selectedTestEmpty}>Выберите тест</div>
                    )}

                    {selectedTest && !activeTest && selectedTest.score === null && (
                        <Flex
                            vertical
                            align="center"
                            justify="center"
                            gap={20}
                            className={styles.startTest}
                        >
                            <div className={styles.selectedTestTitle}>
                                {selectedTest.title}
                            </div>

                            <Button
                                type="primary"
                                size="large"
                                loading={isStartingTest}
                                onClick={() => startStudentTestAsync(ctx)}
                            >
                                Начать
                            </Button>
                        </Flex>
                    )}

                    {selectedTest && !activeTest && selectedTest.score !== null && (
                        <Flex
                            vertical
                            align="center"
                            justify="center"
                            gap={12}
                            className={styles.startTest}
                        >
                            <div className={styles.selectedTestTitle}>
                                {selectedTest.title}
                            </div>
                            <div className={styles.passedTestText}>
                                тест уже пройден
                            </div>
                        </Flex>
                    )}

                    {activeTest && currentQuestion && (
                        <Flex vertical gap={26} className={styles.questionView}>
                            <Flex align="center" gap={14}>
                                <Button
                                    icon={<LeftOutlined />}
                                    onClick={() => prevQuestionAction(ctx)}
                                />

                                <Flex
                                    align="center"
                                    justify="center"
                                    className={styles.questionText}
                                >
                                    {currentQuestion.text}
                                </Flex>

                                {isLastQuestion ? (
                                    <Button
                                        type="primary"
                                        icon={<CheckOutlined />}
                                        loading={isFinishingTest}
                                        onClick={() =>
                                            finishStudentAttemptAsync(ctx)
                                        }
                                    />
                                ) : (
                                    <Button
                                        icon={<RightOutlined />}
                                        onClick={() => nextQuestionAction(ctx)}
                                    />
                                )}
                            </Flex>

                            <div className={styles.answers}>
                                {currentQuestion.answers.map((answer) => {
                                    const AnswerControl =
                                        currentQuestion.type === 'multiple'
                                            ? Checkbox
                                            : Radio

                                    return (
                                        <AnswerControl
                                            key={answer.id}
                                            checked={answer.isSelected}
                                            className={`${styles.answer} ${
                                                answer.isSelected
                                                    ? styles.selectedAnswer
                                                    : ''
                                            }`}
                                            onChange={() =>
                                                saveStudentAnswerAsync(
                                                    ctx,
                                                    currentQuestion.id,
                                                    answer.id,
                                                )
                                            }
                                        >
                                            {answer.text}
                                        </AnswerControl>
                                    )
                                })}
                            </div>

                            <Flex gap={10} className={styles.questions}>
                                {activeTest.questions.map((question, index) => (
                                    <button
                                        key={question.id}
                                        type="button"
                                        className={`${styles.questionButton} ${
                                            index === currentQuestionIndex
                                                ? styles.selectedQuestionButton
                                                : ''
                                        } ${
                                            question.answers.some(
                                                (answer) => answer.isSelected,
                                            )
                                                ? styles.answeredQuestionButton
                                                : ''
                                        }`}
                                        onClick={() =>
                                            currentQuestionIndexAtom(ctx, index)
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </Flex>
                        </Flex>
                    )}
                </div>
            </Flex>
        </Flex>
    )
})
