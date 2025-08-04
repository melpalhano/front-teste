'use client';

import { useDataTable } from './context/data-table-context';
import * as styles from './styles/data-table.css';
import { PaginationActions } from './types/data-table-pagination.type';

export function DataTablePagination() {
  const { table } = useDataTable();

  const paginationActions: PaginationActions = {
    onPageNext: () => table.nextPage(),
    onPagePrevious: () => table.previousPage(),
    canGetPreviousPage: table.getCanPreviousPage(),
    canGetNextPage: table.getCanNextPage(),
    onPageLast: () => table.lastPage(),
    onPageFirst: () => table.firstPage(),
    pageIndex: table.getState().pagination.pageIndex + 1,
    totalCount: table.getRowCount(),
  };

  const handlePageChange = (pageIndex: number) => {
    table.setPageIndex(pageIndex - 1);
  };

  return (
    <div className={styles.dataTablePaginationStyle}>
      <button
        onClick={paginationActions.onPagePrevious}
        disabled={!paginationActions.canGetPreviousPage}
        className={styles.dataTablePaginationButtonStyle}
        aria-label='Página anterior'
      >
        Anterior
      </button>

      {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
        (pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex + 1)}
            className={`${styles.dataTablePaginationButtonStyle} ${
              table.getState().pagination.pageIndex === pageIndex
                ? styles.dataTablePaginationButtonActiveStyle
                : ''
            }`}
            aria-label={`Página ${pageIndex + 1}`}
          >
            {pageIndex + 1}
          </button>
        ),
      )}

      <button
        onClick={paginationActions.onPageNext}
        disabled={!paginationActions.canGetNextPage}
        className={styles.dataTablePaginationButtonStyle}
        aria-label='Próxima página'
      >
        Próximo
      </button>

      <span className={styles.dataTablePaginationInfoStyle}>
        Página {paginationActions.pageIndex} de {table.getPageCount()}
      </span>
    </div>
  );
}
