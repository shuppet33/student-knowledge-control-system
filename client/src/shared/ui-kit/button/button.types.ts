import type { ComponentProps, ReactNode } from 'react';
import type { Button } from '@base-ui/react';

export type ButtonProps = ComponentProps<typeof Button> & {
    children?: ReactNode;
    className?: string;
    isLoading?: boolean;
    text?: string;
};
