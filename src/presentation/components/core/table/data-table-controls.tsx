'use client';

import * as styles from './styles/data-table.css';
import { DataTableControlsProps } from './types/data-table-controls.type';

export function DataTableControls({
  children,
  className = '',
}: DataTableControlsProps) {
  return (
    <div className={`${styles.dataTableControlsStyle} ${className}`}>
      {children}
    </div>
  );
}
