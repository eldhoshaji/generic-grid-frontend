'use client';

import DataGrid from '@/components/DataGrid/DataGrid';
import { useEffect, useState, useCallback } from 'react';
import { fetchTableData, fetchTableConfig } from '@/app/services/tableService';
import { UserResponseModel } from '@/app/types/api/UserResponseModel';
import { TableParams, TableConfigResponseModel, ColumnConfig, RowStyleRule } from '@/app/types/api/TableModel';
import { mapConfigToColumns } from '@/app/utils/tableHelper';
import { getRowClassFromRules } from '@/app/utils/getRowClassFromRules';
import { useParams } from 'next/navigation';

export default function UsersPage() {
  
    const { resource } = useParams();

    const [users, setUsers] = useState<UserResponseModel[]>([]);
    const [columnConfigs, setColumnConfigs] = useState<ColumnConfig[]>([]);
    const [rowStyleRules, setRowStyleRules] = useState<RowStyleRule[]>([]);
  
    const [loadingConfig, setLoadingConfig] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
      search: { key: '', value: '' },
      filters: [],
      pagination: { page: 1, size: 10 },
      sort: { key: '', direction: 'asc' },
      total: 0
    });    
    const [totalSize, setTotalSize] = useState<number>(0);
  
    useEffect(() => {
      if (typeof resource === 'string') {
          loadTableConfig(resource);
      }
    }, [resource]);
  
    const loadTableConfig = async (resource: string) => {
      setLoadingConfig(true);
      try {
        const config = await fetchTableConfig<TableConfigResponseModel>(resource);
        const mappedColumns = mapConfigToColumns(config.column_configs);
        setColumnConfigs(mappedColumns);
        setRowStyleRules(config.row_style_rules)
      } catch (error) {
        console.error('Failed to load config', error);
      } finally {
        setLoadingConfig(false);
      }
    };
  
    const loadUsers = useCallback(async (resource: string, params: TableParams) => {
      setLoadingUsers(true);
      try {
        const data = await fetchTableData<UserResponseModel>(resource, params);
        setUsers(data.items);
        setTotalSize(data.total);
      } catch (error) {
        console.error('Failed to load users', error);
      } finally {
        setLoadingUsers(false);
      }
    }, []);
  
    // Load users whenever tableParams change — but ONLY after config is loaded
    useEffect(() => {
      if (columnConfigs.length > 0 && !loadingConfig && typeof resource === 'string') {
        loadUsers(resource, tableParams);
      }
    }, [resource, tableParams, columnConfigs, rowStyleRules, loadingConfig, loadUsers]);
  
    const handleTableChange = (changes: { 
      filters: any; 
      searchQuery: any; 
      sortConfig: any;
      pagination: any;
    }) => {
      const newFilters = Object.entries(changes.filters || {}).map(([key, value]) => ({ key, value }));
      const newSearchKey = changes.searchQuery?.key || '';
      const newSearchValue = changes.searchQuery?.value || '';
      const newSortKey = changes.sortConfig?.key || '';
      const newSortDirection = changes.sortConfig?.direction || 'asc';
    
      const newPage = changes.pagination?.page ?? tableParams.pagination.page;
      const newSize = changes.pagination?.size ?? tableParams.pagination.size;
    
      const newParams: TableParams = {
        ...tableParams,
        filters: newFilters,
        search: { key: newSearchKey, value: newSearchValue },
        sort: { key: newSortKey, direction: newSortDirection },
        pagination: { page: newPage, size: newSize },
      };
    
      const paramsChanged = JSON.stringify(newParams) !== JSON.stringify(tableParams);
      if (paramsChanged) {
        setTableParams(newParams);
      }
    };
  
    return (
        <main className="p-8">
        {loadingConfig || loadingUsers ? (
            <div>Loading...</div>
        ) : (
          <DataGrid
            columns={columnConfigs}
            data={users}
            totalSize={totalSize}
            onChange={handleTableChange}
            filters={Object.fromEntries(tableParams.filters.map(f => [f.key, f.value]))}
            searchQuery={tableParams.search}
            pagination={tableParams.pagination}
            sortConfig={tableParams.sort}          
            rowClass={(record) => getRowClassFromRules(record, rowStyleRules)}
          />
        )}
        </main>
    );
}
