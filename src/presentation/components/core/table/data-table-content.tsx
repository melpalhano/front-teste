'use client';

import { flexRender } from '@tanstack/react-table';

import { useDataTable } from './context/data-table-context';
import { DataTableHeader } from './data-table-header';
import * as styles from './styles/data-table.css';
import { DataTableContentProps } from './types/data-table-content.type';

export function DataTableContent({ footer = false }: DataTableContentProps) {
  const { table } = useDataTable();

  return (
    <div className={styles.dataTableContentStyle}>
      <div className={styles.dataTableWrapperStyle}>
        <table className={styles.dataTableStyle}>
          <thead className={styles.dataTableHeaderStyle}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.dataTableRowStyle}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.column.columnDef.size }}
                  >
                    {header.isPlaceholder ? null : (
                      <DataTableHeader header={header} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles.dataTableBodyStyle}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${styles.dataTableRowStyle} ${
                    index % 2 === 0
                      ? styles.dataTableRowEvenStyle
                      : styles.dataTableRowOddStyle
                  }`}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.dataTableCellStyle}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className={styles.dataTableEmptyStyle}
                >
                  Sem resultados
                </td>
              </tr>
            )}
            {footer &&
              table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id} className={styles.dataTableRowStyle}>
                  {footerGroup.headers.map((header) => (
                    <td key={header.id} className={styles.dataTableCellStyle}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
