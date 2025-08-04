'use client';

import * as styles from './styles/modal.css';
import { ConfirmationModalTitleProps } from './types/confirmation-modal-title.type';

export const ConfirmationModalTitle = ({
  children,
  className,
}: ConfirmationModalTitleProps) => {
  return (
    <h2 className={`${styles.modalTitle} ${className || ''}`}>{children}</h2>
  );
};
