import { Button, Flex, Radio } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { reatomComponent } from '@reatom/npm-react'

import { useLoaderData } from 'react-router'

import type { StudentSubjectTestsLoaderData } from '$app/router/router.view'

import {
    saveStudentAnswerAsync,
    startStudentTestAsync,
} from '$pages/student/model/student.service.ts'
import {
    activeStudentTestAtom,
    currentQuestionIndexAtom,
    nextQuestionAction,
    openStudentSubjectAction,
    prevQuestionAction,
    selectedTestAtom,
    selectStudentTestAction,
    setCurrentQuestionIndexAction,
} from '$pages/student/model/student.state.ts'

import { TestCard } from './test-card.view'

import styles from './subject-tests.module.css'

export const SubjectTestsPage = reatomComponent(({ ctx }) => {
    const { subject, tests } = useLoaderData<StudentSubjectTestsLoaderData>()

    if (subject) {
        openStudentSubjectAction(ctx, subject.id)
    }

    const selectedTest = ctx.spy(selectedTestAtom)
    const activeTest = ctx.spy(activeStudentTestAtom)
    const currentQuestionIndex = ctx.spy(currentQuestionIndexAtom)
    const { isPending: isStartingTest } = ctx.spy(
        startStudentTestAsync.statusesAtom,
    )
    const currentQuestion = activeTest?.questions[currentQuestionIndex]

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
                            onClick={() => selectStudentTestAction(ctx, test)}
                        />
                    ))}
                </Flex>

                <div className={styles.testView}>
                    {!selectedTest && (
                        <div className={styles.selectedTestEmpty}>Выберите тест</div>
                    )}

                    {selectedTest && !activeTest && (
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

                                <Button
                                    icon={<RightOutlined />}
                                    onClick={() => nextQuestionAction(ctx)}
                                />
                            </Flex>

                            <div className={styles.answers}>
                                {currentQuestion.answers.map((answer) => (
                                    <Radio
                                        key={answer.id}
                                        checked={answer.isSelected}
                                        className={styles.answer}
                                        onChange={() =>
                                            saveStudentAnswerAsync(
                                                ctx,
                                                currentQuestion.id,
                                                answer.id,
                                            )
                                        }
                                    >
                                        {answer.text}
                                    </Radio>
                                ))}
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
                                        }`}
                                        onClick={() =>
                                            setCurrentQuestionIndexAction(
                                                ctx,
                                                index,
                                            )
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
