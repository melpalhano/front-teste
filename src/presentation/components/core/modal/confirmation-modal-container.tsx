'use client';

import * as styles from './styles/modal.css';
import { ConfirmationModalContainerProps } from './types/confirmation-modal-container.type';

export const ConfirmationModalContainer = ({
  children,
  variant,
}: ConfirmationModalContainerProps) => {
  const className =
    variant === 'header' ? styles.modalHeader : styles.modalFooter;

  return <div className={className}>{children}</div>;
};
