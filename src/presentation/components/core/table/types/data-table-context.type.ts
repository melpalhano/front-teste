import { Table as TanstackTable } from '@tanstack/react-table';

export interface DataTableContextValue<TData> {
  data: TData[];
  table: TanstackTable<TData>;
}
