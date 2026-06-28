import { Card, Flex, Typography } from 'antd'

import type { FC } from 'react'

import type { StudentSubject } from '$common/api/students/students.types'

import styles from './subject-card.module.css'

const { Title } = Typography

type SubjectCardProps = {
    subject: StudentSubject
    onClick: () => void
}

export const SubjectCard: FC<SubjectCardProps> = ({ subject, onClick }) => {
    return (
        <Card
            className={styles.card}
            onClick={onClick}
            styles={{
                body: {
                    height: '100%',
                    padding: 20,
                },
            }}
        >
            <Flex vertical justify="space-between" className={styles.content}>
                <Title level={4} className={styles.title}>
                    {subject.name}
                </Title>

                <Flex justify="space-between" align="center" className={styles.metrics}>
                    <Flex
                        align={'center'}
                        justify={'center'}
                        className={styles.score}
                    >
                        <div className={styles.count}>
                            {subject.averageScore ?? ''}
                        </div>
                    </Flex>

                    <Flex
                        align={'center'}
                        justify={'center'}
                        className={styles.countQuestions}
                        gap={4}
                        wrap={false}
                    >
                        <div className={styles.count}>
                            {subject.passedTestsCount}
                        </div>

                        <div>/</div>

                        <div className={styles.count}>
                            {subject.totalTestsCount}
                        </div>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}
