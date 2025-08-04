'use client';

import { useQuery } from '@tanstack/react-query';

import { getCentrals } from '../api';
import { QUERY_KEYS } from '../constants/query-keys';

interface GetCentralsParams {
  search?: string;
}

export function useCentrals(params: GetCentralsParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.CENTRALS, params],
    queryFn: () => getCentrals(params),
    staleTime: 30000,
    gcTime: 300000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
