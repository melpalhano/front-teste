'use client';

import * as styles from './styles/modal.css';
import { ConfirmationModalButtonProps } from './types/confirmation-modal-button.type';

export const ConfirmationModalButton = ({
  children,
  onClick,
  disabled = false,
  className,
  variant,
}: ConfirmationModalButtonProps) => {
  const baseClassName =
    variant === 'cancel' ? styles.modalButtonCancel : styles.modalButtonConfirm;
  const finalClassName =
    variant === 'confirm'
      ? `${baseClassName} ${className || ''}`
      : baseClassName;

  return (
    <button onClick={onClick} className={finalClassName} disabled={disabled}>
      {variant === 'confirm' ? (
        <div className={styles.modalButtonText}>{children}</div>
      ) : (
        children
      )}
    </button>
  );
};
