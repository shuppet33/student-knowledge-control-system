import clsx from 'clsx'

import styles from './loader.module.css'

type Props = {
    className?: string
    label?: string
}

export const LoaderUI = ({
    className,
    label = 'Загрузка',
}: Props) => {
    return (
        <div
            className={clsx(styles.loader, className)}
            role="status"
            aria-label={label}
        >
            <span className={styles.loader__spinner} />
        </div>
    )
}
