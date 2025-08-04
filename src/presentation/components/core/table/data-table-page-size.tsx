'use client';

import { useDataTable } from './context/data-table-context';
import * as styles from './styles/data-table.css';
import { DataTablePageSizeProps } from './types/data-table-page-size.type';

export function DataTablePageSize({
  pageSizeOptions = [5, 10, 20, 50],
  className = '',
}: DataTablePageSizeProps) {
  const { table } = useDataTable();

  return (
    <div className={`${styles.dataTablePageSizeStyle} ${className}`}>
      <label htmlFor='page-size' className={styles.dataTablePageSizeLabelStyle}>
        Itens por página:
      </label>
      <select
        id='page-size'
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className={styles.dataTablePageSizeSelectStyle}
      >
        {pageSizeOptions.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
