export interface PaginationActions {
  onPageNext: () => void;
  onPagePrevious: () => void;
  canGetPreviousPage: boolean;
  canGetNextPage: boolean;
  onPageLast: () => void;
  onPageFirst: () => void;
  pageIndex: number;
  totalCount: number;
}
