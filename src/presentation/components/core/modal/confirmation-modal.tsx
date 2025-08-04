'use client';

import { ConfirmationModalProvider } from './context/confirmation-modal-context';
import { ConfirmationModalProps } from './types/confirmation-modal.type';

export const ConfirmationModal = ({ children }: ConfirmationModalProps) => {
  return <ConfirmationModalProvider>{children}</ConfirmationModalProvider>;
};
