import type { ComponentProps, FC, ReactNode } from 'react';
import type { Dialog } from '@base-ui/react';


export type CloseButtonProps = ComponentProps<typeof Dialog.Close>;

type ModalFooterControls = {
    CloseButton: FC<ComponentProps<typeof Dialog.Close>>;
};

export type ModalProps = ComponentProps<typeof Dialog.Root> & {
    hideCloseButton?: boolean;
    title?: string;
    children?: ReactNode;
    description?: string;
    footer?: (props: {}, controls: ModalFooterControls) => ReactNode;
    isWarning?: boolean;
    trigger?: ComponentProps<typeof Dialog.Trigger>['render'];
};