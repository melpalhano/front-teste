'use client';

import { ReactNode, useEffect } from 'react';

import { useCentrals } from '../queries';
import { useCentralStore } from '../state/central-store';

interface CentralCounterProviderProps {
  children: ReactNode;
}

export function CentralCounterProvider({
  children,
}: CentralCounterProviderProps) {
  const { data: centrals, isLoading, error } = useCentrals({});
  const { setTotalCentrals, setLoading } = useCentralStore();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (centrals && !error) {
      setTotalCentrals(centrals.length);
    }
  }, [centrals, error, setTotalCentrals]);

  return <>{children}</>;
}
