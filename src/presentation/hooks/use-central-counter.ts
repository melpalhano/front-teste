import { useEffect } from 'react';
import { useCentrals } from '../queries';
import { useCentralStore } from '../state/central-store';

interface UseCentralCounterParams {
  search?: string;
}

export function useCentralCounter(params: UseCentralCounterParams = {}) {
  const { data: centrals } = useCentrals(params);
  const { setTotalCentrals } = useCentralStore();

  useEffect(() => {
    if (centrals) {
      setTotalCentrals(centrals.length);
    }
  }, [centrals, setTotalCentrals]);

  return { totalCentrals: centrals?.length || 0 };
}
