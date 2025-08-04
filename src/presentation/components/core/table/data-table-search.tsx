'use client';

import { useDataTable } from './context/data-table-context';
import * as styles from './styles/data-table.css';
import { DataTableSearchProps } from './types/data-table-search.type';

export function DataTableSearch({
  placeholder = 'Buscar por Nome ou Modelo',
  className = '',
}: DataTableSearchProps) {
  const { table } = useDataTable();

  return (
    <div className={`${styles.dataTableSearchStyle} ${className}`}>
      <label
        htmlFor='search'
        className={styles.dataTableSearchLabelStyle}
      ></label>
      <input
        id='search'
        type='text'
        placeholder={placeholder}
        value={table.getState().globalFilter ?? ''}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className={styles.dataTableSearchInputStyle}
      />
    </div>
  );
}
