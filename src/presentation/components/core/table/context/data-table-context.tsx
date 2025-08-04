'use client';

import { createContext, useContext } from 'react';

import { DataTableContextValue } from '../types/data-table-context.type';

const DataTableContext = createContext<DataTableContextValue<any> | null>(null);

export function useDataTable<TData>() {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error('useDataTable must be used within a DataTable.Root');
  }
  return context as DataTableContextValue<TData>;
}

export { DataTableContext };
