'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { restoreCentral } from '../api/central/restoreCentral';
import { QUERY_KEYS } from '../constants/query-keys';
import { useCentralStore } from '../state/central-store';
import { useUndoStore } from '../state/undo-store';
import { CentralWithModel } from '../types/central/central';
import { useCentralCounterSync } from './use-central-counter-sync';

export function useUndoDelete() {
  const queryClient = useQueryClient();
  const { syncCounter } = useCentralCounterSync();
  const { incrementTotal } = useCentralStore();
  const { showUndoNotification, hideUndoNotification, deletedCentral } =
    useUndoStore();

  const { mutateAsync: restoreCentralFn, isPending: isRestoring } = useMutation(
    {
      mutationFn: restoreCentral,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.CENTRALS],
        });
      },
    },
  );

  const handleDeleteWithUndo = async (central: CentralWithModel) => {
    showUndoNotification(central);

    toast.success('Central excluída com sucesso!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleUndo = async () => {
    if (!deletedCentral) return;

    try {
      await restoreCentralFn({ central: deletedCentral });

      incrementTotal();
      await syncCounter();

      hideUndoNotification();

      toast.success('Central restaurada com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Erro ao restaurar central:', error);
      toast.error('Erro ao restaurar central', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleDismiss = () => {
    hideUndoNotification();
  };

  return {
    handleDeleteWithUndo,
    handleUndo,
    handleDismiss,
    isRestoring,
  };
}
