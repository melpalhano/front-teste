'use client';

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

import { sanitizeSearchInputQuery } from '../../../utils/sanitize-search-input';
import { DataTableContext } from './context/data-table-context';
import * as styles from './styles/data-table.css';
import { DataTableProps } from './types/data-table-root.type';

export function DataTableRoot<TData>({
  columns,
  data,
  children,
  invisibleColumns = [],
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    Object.fromEntries(invisibleColumns.map((column) => [column, false])),
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    enableSorting: true,
    enableMultiSort: false,
    sortDescFirst: false,
    globalFilterFn: (row, columnId, filterValue) => {
      const safeValue = (() => {
        const value = row.getValue(columnId);
        return typeof value === 'number' ? String(value) : value;
      })();

      const sanitizedValue = sanitizeSearchInputQuery(String(safeValue));
      const searchTerms = sanitizeSearchInputQuery(filterValue).split(' ');

      return searchTerms.every((term) => sanitizedValue.includes(term));
    },
    state: {
      columnFilters,
      globalFilter,
      columnVisibility,
      sorting,
    },
  });

  return (
    <DataTableContext.Provider value={{ table, data }}>
      <div className={styles.dataTableRootStyle}>{children}</div>
    </DataTableContext.Provider>
  );
}
