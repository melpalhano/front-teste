'use client';

import { flexRender } from '@tanstack/react-table';

import * as styles from './styles/data-table.css';
import { DataTableHeaderProps } from './types/data-table-header.type';

export function DataTableHeader<TData, TValue>({
  header,
}: DataTableHeaderProps<TData, TValue>) {
  const canSort = header.column.getCanSort();
  const isSorted = header.column.getIsSorted();

  const getSortIcon = () => {
    if (!canSort) return null;
    switch (isSorted) {
      case 'desc':
        return '↓';
      default:
        return '↑';
    }
  };

  const handleSortClick = () => {
    if (!canSort) return;
    const currentSort = header.column.getIsSorted();
    if (currentSort === 'asc') {
      header.column.toggleSorting(true);
    } else {
      header.column.toggleSorting(false);
    }
  };

  return (
    <div
      className={`${styles.dataTableHeaderCellStyle} ${
        canSort ? styles.dataTableHeaderSortableStyle : ''
      }`}
      onClick={handleSortClick}
      style={{ cursor: canSort ? 'pointer' : 'default' }}
    >
      <div className={styles.dataTableHeaderContentStyle}>
        {flexRender(header.column.columnDef.header, header.getContext())}
        {canSort && (
          <div className={styles.dataTableHeaderSortIconStyle}>
            {getSortIcon()}
          </div>
        )}
      </div>
    </div>
  );
}
