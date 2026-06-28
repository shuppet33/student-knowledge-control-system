import { Flex } from 'antd'

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
