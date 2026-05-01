import type {FC} from 'react';
import {Dialog} from '@base-ui/react';

import {CloseButton} from './close-button.view';
import type {ModalProps} from './modal.types';

import styles from './modal.module.css';


export const Modal: FC<ModalProps> = ({
                                          trigger,
                                          description,
                                          title,
                                          children,
                                          isWarning,
                                          footer,
    hideCloseButton,
                                          ...props
                                      }) => {
    return (
        <Dialog.Root {...props}>
            {trigger && <Dialog.Trigger render={trigger}/>}
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.backdrop}/>

                <Dialog.Popup className={styles.popup}>
                    {title && <Dialog.Title className={styles.title}>
                        {title}
                    </Dialog.Title>}
                    <Dialog.Description className={styles.description}>
                        {description}
                    </Dialog.Description>
                    <div className={styles.modalContent}>{children}</div>
                    <div className={styles.actions}>
                        {!hideCloseButton && (
                            footer
                                ? footer({}, { CloseButton })
                                : <CloseButton />
                        )}
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}