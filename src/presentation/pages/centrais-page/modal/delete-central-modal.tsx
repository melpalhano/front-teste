'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useState } from 'react';

import { deleteCentral } from '../../../api/central/deleteCentral';
import { Button } from '../../../components/core/button';
import {
  ConfirmationModalButton,
  ConfirmationModalContainer,
  ConfirmationModalDescription,
  ConfirmationModalTitle,
} from '../../../components/core/modal';
import * as modalStyles from '../../../components/core/modal/styles/modal.css';
import { LoaderIcon } from '../../../components/icons/loader';
import { TrashIcon } from '../../../components/icons/trash';
import { QUERY_KEYS } from '../../../constants/query-keys';
import { useCentralCounterSync } from '../../../hooks/use-central-counter-sync';
import { useUndoDelete } from '../../../hooks/use-undo-delete';
import { useCentralStore } from '../../../state/central-store';
import { CentralWithModel } from '../../../types/central/central';
import * as styles from './styles/delete-central-modal.css';

interface DeleteCentralModalContextType {
  isOpen: boolean;
  central: CentralWithModel | null;
  openModal: (central: CentralWithModel) => void;
  closeModal: () => void;
}

const DeleteCentralModalContext =
  createContext<DeleteCentralModalContextType | null>(null);

export function useDeleteCentralModal() {
  const context = useContext(DeleteCentralModalContext);
  if (!context) {
    throw new Error(
      'useDeleteCentralModal must be used within DeleteCentralModalProvider',
    );
  }
  return context;
}

export function DeleteCentralModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [central, setCentral] = useState<CentralWithModel | null>(null);

  const openModal = (centralData: CentralWithModel) => {
    setCentral(centralData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCentral(null);
  };

  return (
    <DeleteCentralModalContext.Provider
      value={{ isOpen, central, openModal, closeModal }}
    >
      {children}
    </DeleteCentralModalContext.Provider>
  );
}

function DeleteCentralModalContent() {
  const { isOpen, central, closeModal } = useDeleteCentralModal();
  const queryClient = useQueryClient();
  const { decrementTotal } = useCentralStore();
  const { syncCounter } = useCentralCounterSync();
  const { handleDeleteWithUndo } = useUndoDelete();

  const { mutateAsync: deleteCentralFn, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteCentral({ centralId: central!.id }),
  });

  const handleDelete = async () => {
    if (!central) return;

    try {
      await deleteCentralFn();

      decrementTotal();
      await syncCounter();

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CENTRALS],
      });

      closeModal();

      await handleDeleteWithUndo(central);
    } catch (error) {
      console.error('Erro ao deletar central:', error);
    }
  };

  if (!isOpen || !central) return null;

  return (
    <div className={modalStyles.modalOverlay} onClick={closeModal}>
      <div
        className={modalStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <ConfirmationModalContainer variant='header'>
          <ConfirmationModalTitle className={styles.deleteModalTitle}>
            Deseja mesmo excluir a {central.name}?
          </ConfirmationModalTitle>
          <ConfirmationModalDescription
            className={styles.deleteModalDescription}
          >
            Uma vez excluído, não será possível reverter essa ação.
          </ConfirmationModalDescription>
        </ConfirmationModalContainer>

        <ConfirmationModalContainer variant='footer'>
          <ConfirmationModalButton
            variant='cancel'
            onClick={closeModal}
            disabled={isDeleting}
          >
            Cancelar
          </ConfirmationModalButton>
          <ConfirmationModalButton
            variant='confirm'
            onClick={handleDelete}
            disabled={isDeleting}
            className={styles.deleteModalButtonConfirm}
          >
            {isDeleting && <LoaderIcon size='16px' />}
            Confirmar
          </ConfirmationModalButton>
        </ConfirmationModalContainer>
      </div>
    </div>
  );
}

export function DeleteCentralButton({
  central,
}: {
  central: CentralWithModel;
}) {
  const { openModal } = useDeleteCentralModal();

  return (
    <Button
      onClick={() => openModal(central)}
      variant='danger'
      size='small'
      icon={<TrashIcon customSize='12px' />}
      iconPosition='left'
    >
      Deletar
    </Button>
  );
}

export function DeleteCentralModal({ children }: { children: ReactNode }) {
  return (
    <DeleteCentralModalProvider>
      {children}
      <DeleteCentralModalContent />
    </DeleteCentralModalProvider>
  );
}
