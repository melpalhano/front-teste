import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { QUERY_KEYS } from '../constants/query-keys';
import { useCentralStore } from '../state/central-store';
import { Central } from '../types/central/central';

export function useCentralCounterSync() {
  const queryClient = useQueryClient();
  const { setTotalCentrals } = useCentralStore();

  const syncCounter = async () => {
    try {
      const centralsData = await queryClient.fetchQuery({
        queryKey: [QUERY_KEYS.CENTRALS, {}],
        staleTime: 0,
      }) as Central[];

      if (centralsData) {
        setTotalCentrals(centralsData.length);
      }
    } catch (error) {
      console.error('Erro ao sincronizar contador:', error);
    }
  };

  useEffect(() => {
    syncCounter();
  }, []);

  return { syncCounter };
}
