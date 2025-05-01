// types/TableTypes.ts
export type ColumnType<T> = {
    title: string;
    key: keyof T;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    type?: 'text' | 'number' | 'date' | 'heatmap' | 'tags' | 'link' | 'datetime';
    filterable?: boolean;
    onFilter?: (filterValue: any, record: T) => boolean;
    filters?: { text: string; value: any }[];
    searchable?: boolean;
    onSearch?: (searchValue: string, record: T) => boolean;
    sortable: boolean;
    sorter?: (a: T, b: T) => number;
  };

  
  export type DataGridProps<T> = {
    columns: ColumnType[];
    data: T[];
    totalSize: number;
    onChange?: (params: {
      filters: { [key: string]: any };
      searchQuery: { key: string; value: string; } | null;  
      sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
      pagination: { page: number, size: number };
    }) => void;  
    filters?: { [key: string]: any };
    searchQuery?: { key: string; value: string; } | null;  
    sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;  
    pagination?: { page: number, size: number };
    enablePagination?: boolean;
    rowClass?: (record: T, index: number) => string;
    loading?: boolean;
  };
