'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import { useFilterStore } from '../state/filter-store';

export function useSearchParamsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { syncFromSearchParams, setUpdateSearchParamsFunction } =
    useFilterStore();

  useEffect(() => {
    syncFromSearchParams(searchParams);
  }, [searchParams, syncFromSearchParams]);

  const updateSearchParams = useCallback(
    (updateFn: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      updateFn(params);

      const newUrl = params.toString()
        ? `?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  useEffect(() => {
    setUpdateSearchParamsFunction(updateSearchParams);
  }, [updateSearchParams, setUpdateSearchParamsFunction]);

  return {
    updateSearchParams,
    currentParams: searchParams,
  };
}
