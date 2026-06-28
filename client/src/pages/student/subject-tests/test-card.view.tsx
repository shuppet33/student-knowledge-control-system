import { Flex } from 'antd'

import { ScoreTest } from './score-test.view'

import styles from './subject-tests.module.css'

type TestCardProps = {
    title: string
    metrics: { to: number; from: number }
    score: number | null
    dateOfAppointment: string
    isSelected: boolean
    onClick: () => void
}

export const TestCard = ({
    title,
    metrics,
    score,
    dateOfAppointment,
    isSelected,
    onClick,
}: TestCardProps) => {
    return (
        <Flex
            vertical
            justify={'space-between'}
            className={`${styles.testCard} ${isSelected ? styles.selectedTestCard : ''}`}
            onClick={onClick}
        >
            <Flex align={'center'} justify={'space-between'} gap={16}>
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
