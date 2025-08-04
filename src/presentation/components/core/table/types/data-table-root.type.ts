import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  children: ReactNode;
  invisibleColumns?: string[];
}
