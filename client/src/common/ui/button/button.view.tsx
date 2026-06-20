import { CloseOutlined } from '@ant-design/icons'

import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    active?: boolean
    onDelete?: () => void
}

export const ButtonUI = ({ children, active = false, className, onDelete, ...props }: Props) => {
    return (
        <div className={clsx(styles.subject, active && styles.subjectActive, className)}>
            <button className={styles.selectButton} {...props} type={props.type ?? 'button'}>
                <span className={clsx(styles.buttonText, onDelete && styles.buttonTextLeft)}>
                    {children}
                </span>
            </button>

            {onDelete && (
                <div className={styles.deleteButton} onClick={onDelete}>
                    <CloseOutlined />
                </div>
            )}
        </div>
    )
}
