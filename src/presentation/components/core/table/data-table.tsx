'use client';

import { DataTableContent } from './data-table-content';
import { DataTableControls } from './data-table-controls';
import { DataTablePageSize } from './data-table-page-size';
import { DataTablePagination } from './data-table-pagination';
import { DataTableRoot } from './data-table-root';
import { DataTableSearch } from './data-table-search';

const DataTable = {
  Root: DataTableRoot,
  Content: DataTableContent,
  Search: DataTableSearch,
  PageSize: DataTablePageSize,
  Pagination: DataTablePagination,
  Controls: DataTableControls,
};

export default DataTable;
