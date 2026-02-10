export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortValue?: 'asc' | 'desc';
  filter?: string;
  equal?: string;
  fields?: string;
  q?: string;
}
