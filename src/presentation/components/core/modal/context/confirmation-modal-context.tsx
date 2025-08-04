'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import { ConfirmationModalContextType } from '../types/confirmation-modal-context.type';

const ConfirmationModalContext =
  createContext<ConfirmationModalContextType | null>(null);

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error(
      'useConfirmationModal must be used within ConfirmationModalProvider',
    );
  }
  return context;
};

export const ConfirmationModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ConfirmationModalContext.Provider
      value={{ isOpen, openModal, closeModal }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
};
