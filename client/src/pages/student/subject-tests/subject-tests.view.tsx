import { Flex } from 'antd'

import { reatomComponent } from '@reatom/npm-react'

import { useLoaderData } from 'react-router'

import type { StudentSubjectTestsLoaderData } from '$app/router/router.view'

import { selectedTestAtom } from '$pages/student/model/student.state.ts'

import { TestCard } from './test-card.view'

import styles from './subject-tests.module.css'

export const SubjectTestsPage = reatomComponent(({ ctx }) => {
    const { subject, tests } = useLoaderData<StudentSubjectTestsLoaderData>()
    const selectedTest = ctx.spy(selectedTestAtom)

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
                            onClick={() => selectedTestAtom(ctx, test)}
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
