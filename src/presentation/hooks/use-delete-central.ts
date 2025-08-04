'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCentral } from '../api/central/deleteCentral';
import { QUERY_KEYS } from '../constants/query-keys';

export function useDeleteCentral() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCentral,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CENTRALS],
      });
    },
  });

  return {
    deleteCentral: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
