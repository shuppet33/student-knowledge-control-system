import { Flex } from 'antd'

const scoreColors = {
    undefined: {
        background: 'var(--app-surface-soft)',
    },
    2: {
        color: 'var(--app-score-bad-text)',
        background: 'var(--app-score-bad-bg)',
    },
    3: {
        color: 'var(--app-score-mid-text)',
        background: 'var(--app-score-mid-bg)',
    },
    4: {
        color: 'var(--app-score-mid-text)',
        background: 'var(--app-score-mid-bg)',
    },
    5: {
        color: 'var(--app-score-good-text)',
        background: 'var(--app-score-good-bg)',
    },
}

import styles from './subject-tests.module.css'

export const ScoreTest = ({ score }: { score: number | null }) => {
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
