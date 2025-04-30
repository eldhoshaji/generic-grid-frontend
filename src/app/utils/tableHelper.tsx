// import { TableColumnType } from 'antd';
import { ColumnConfig } from '@/app/types/api/TableModel'; // Adjust import if needed
// import { DataRecord } from '../models/DataRecord'; // Adjust import if needed

export function mapConfigToColumns(config: ColumnConfig[]): any[] {
  return config.map((field) => {
    const column: any = {
      title: field.title,
      dataIndex: field.key,
      type: field.type,
      key: field.key
    };

    if (field.sortable) {
      column.sortable = true;
      // column.sorter = (a: any, b: any) => {
      //   if (typeof a[field.key] === 'number' && typeof b[field.key] === 'number') {
      //     return a[field.key] - b[field.key];
      //   }
      //   if (typeof a[field.key] === 'string' && typeof b[field.key] === 'string') {
      //     return a[field.key].localeCompare(b[field.key]);
      //   }
      //   return 0;
      // };
    }

    if (field.searchable) {
      // column.onSearch = (value: string, record: any) => {
      //   const recordValue = record[field.key];
      //   return recordValue ? recordValue.toString().toLowerCase().includes((value as string).toLowerCase()) : false;
      // };
      column.searchable = true;
    }

    if (field.filterable && field.filters?.length) {
      column.filterable = true;
      column.filters = field.filters.map((filter) => ({
        text: filter.text,
        value: filter.value,
      }));
      // column.onFilter = (value: string, record: any) => {
      //   const recordValue = record[field.key];
      //   return recordValue ? recordValue.toString().toLowerCase().includes((value as string).toLowerCase()) : false;
      // };
    }

    column.render = (value: any) => <span>{value}</span>;

    return column;
  });
}
