// /types/api/params/tableParams.ts

export interface PaginationParams {
    page: number;
    size: number;
}
  
export interface FilterParam {
    key: string;
    value: any;
}

export interface SearchParam {
    key: string;
    value: any;
}

export interface SortParam {
    key: string;
    direction: 'asc' | 'desc'
}

export interface TableParams {
    pagination: PaginationParams;
    filters: FilterParam[];
    search: SearchParam;
    sort: SortParam;
    total: number;
}


export interface FilterOption {
    text: string;
    value: string;
}


export type RowStyleRule = {
    field: string;
    operator:
      | 'equals'
      | 'notEquals'
      | 'lt'
      | 'gt'
      | 'lte'
      | 'gte'
      | 'includes'
      | 'startsWith'
      | 'endsWith'
      | 'matches';
    value: any;
    class_name: string;
  };

export interface ColumnConfig {
    key: string;
    title: string;
    type: string;
    filterable: boolean;
    sortable: boolean;
    searchable: boolean;
    filters: FilterOption[]
}

export interface TableConfigResponseModel {
    column_configs: ColumnConfig[],
    row_style_rules: RowStyleRule[]
}

export interface PaginatedResponse<T> {
    total: number;
    page: number;
    size: number;
    items: T[];
}