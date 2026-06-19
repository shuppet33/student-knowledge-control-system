import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    active?: boolean
}

export const ButtonUI = ({
    children,
    active = false,
    className,
    ...props
}: Props) => {
    return (
        <button
            className={clsx(
                styles.button,
                active && styles.button_active,
                className,
            )}
            {...props}
        >
            <span className={styles.button__text}>{children}</span>
        </button>
    )
}
