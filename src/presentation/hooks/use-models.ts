import { useQuery } from '@tanstack/react-query';

import { getModels } from '../api/model/getModels';
import { QUERY_KEYS } from '../constants/query-keys';

export function useModels() {
  return useQuery({
    queryKey: [QUERY_KEYS.MODELS],
    queryFn: getModels,
    staleTime: 30000,
    gcTime: 300000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
