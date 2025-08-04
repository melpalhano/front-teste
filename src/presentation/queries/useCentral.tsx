'use client';

import { useQuery } from '@tanstack/react-query';

import { getCentral } from '../api';
import { QUERY_KEYS } from '../constants/query-keys';

export function useCentral(id: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.CENTRAL, id],
    queryFn: () => getCentral(id),
    enabled: !!id,
    staleTime: 30000,
    gcTime: 300000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
