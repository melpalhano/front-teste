'use client';

import * as styles from './styles/modal.css';
import { ConfirmationModalDescriptionProps } from './types/confirmation-modal-description.type';

export const ConfirmationModalDescription = ({
  children,
  className,
}: ConfirmationModalDescriptionProps) => {
  return (
    <p className={`${styles.modalDescription} ${className || ''}`}>
      {children}
    </p>
  );
};
