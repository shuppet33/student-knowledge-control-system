import type { FC } from 'react';
import { Button as BaseUIButton } from '@base-ui/react';
import clsx from 'clsx';

import type { ButtonProps } from './button.types';

import styles from './button.module.css';

export const Button: FC<ButtonProps> = ({ isLoading, children, className, text, ...props }) => {
    return (
        <BaseUIButton
            disabled={isLoading || props.disabled}
            {...props}
            className={clsx(styles.button, className)}
        >
            <span className={clsx(styles.content, isLoading && styles.hidden)}>{text}</span>
            {children}
        </BaseUIButton>
    );
};