import { Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useParams } from 'react-router'

import styles from './subject-tests.module.css'
import { getSubjectTestsResource } from '$pages/student/model/student.service.ts'
import { selectedTestIdAtom, subjectIdAtom } from '$pages/student/model/student.state.ts'

const scoreColors = {
    undefined: {
        background: '#DEE7F0',
    },
    2: {
        color: '#932020',
        background: '#DA8181',
    },
    3: {
        color: '#934E20',
        background: '#E5BA86',
    },
    4: {
        color: '#934E20',
        background: '#E5BA86',
    },
    5: {
        color: '#4B875B',
        background: '#B9E49C',
    },
}

const ScoreTest = ({ score }: { score: number | null }) => {
    return (
        <Flex
            align={'center'}
            justify={'center'}
            className={styles.score}
            style={scoreColors[score ?? 'undefined']}
        >
            <div className={styles.count}>{score ?? ''}</div>
        </Flex>
    )
}

const TestCard = ({
    title,
    metrics,
    score,
    dateOfAppointment,
    onClick,
}: {
    title: string
    metrics: { to: number; from: number }
    score: number | null
    dateOfAppointment: string
    onClick: () => void
}) => {
    return (
        <Flex
            vertical
            justify={'space-between'}
            className={styles.testCard}
            onClick={onClick}
        >
            <Flex align={'center'} gap={8}>
                <div className={styles.testTitle}>{title}</div>

                <Flex gap={10} className={styles.metrics}>
                    <Flex
                        align={'center'}
                        justify={'center'}
                        className={styles.countQuestions}
                        gap={4}
                        wrap={false}
                    >
                        <div className={styles.count}>{metrics.from}</div>

                        <div>/</div>

                        <div className={styles.count}>{metrics.to}</div>
                    </Flex>

                    <ScoreTest score={score} />
                </Flex>
            </Flex>
            <Flex>
                <div className={styles.dateOfAppointment}>{dateOfAppointment}</div>
            </Flex>
        </Flex>
    )
}

export const SubjectTestsPage = reatomComponent(({ ctx }) => {
    const { subjectId } = useParams()
    const { subject, tests } = ctx.spy(getSubjectTestsResource.dataAtom)
    const selectedTestId = ctx.spy(selectedTestIdAtom)
    const selectedTest = tests.find((test) => test.id === selectedTestId)
    const routeSubjectId = subjectId ?? null

    if (ctx.get(subjectIdAtom) !== routeSubjectId) {
        subjectIdAtom(ctx, routeSubjectId)
        selectedTestIdAtom(ctx, null)
    }

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
                            onClick={() => selectedTestIdAtom(ctx, test.id)}
                        />
                    ))}
                </Flex>

                <div className={styles.testView}>
                    {!selectedTest && (
                        <div className={styles.selectedTestEmpty}>Выберите тест</div>
                    )}

                    {selectedTest && (
                        <div className={styles.selectedTestTitle}>
                            {selectedTest.title}
                        </div>
                    )}
                </div>
            </Flex>
        </Flex>
    )
})
