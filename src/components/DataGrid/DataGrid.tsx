import React, { useEffect, useState } from 'react';
import { DataGridProps } from '@/types/table';
import FilterPopover from '@/components/DataGrid/components/FilterPopover';
import SearchPopover from '@/components/DataGrid/components/SearchPopover';
import Heatmap from '@/components/DataGrid/components/ColumnTypes/Heatmap';
import Tags from '@/components/DataGrid/components/ColumnTypes/Tags';
import Link from '@/components/DataGrid/components/ColumnTypes/Link';
import DateTime from '@/components/DataGrid/components/ColumnTypes/DateTime';
import Image from 'next/image';
import Pagination from '@/components/Datagrid/components/Pagination';

function DataGrid<T>({
  columns,
  data,
  totalSize,
  onChange,
  filters: parentFilters = {},
  searchQuery: parentSearchQuery = {},
  sortConfig: parentSortConfig = null,
  pagination: parentPagination = { page: 1, size: 10 },
  rowClass
}: DataGridProps<T>) {
  const [filters, setFilters] = useState<{ [key: string]: any }>(parentFilters);
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: string }>(parentSearchQuery);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(parentSortConfig);
  const [openSearchPopover, setOpenSearchPopover] = useState<string | null>(null);
  const [openFilterPopover, setOpenFilterPopover] = useState<string | null>(null);
  const [pagination, setPagination] = useState(parentPagination);

  const totalPages = Math.ceil(totalSize / pagination.size);

  useEffect(() => {
    if (onChange) {
      onChange({
        filters,
        searchQuery,
        sortConfig,
        pagination
      });
    }
  }, [filters, searchQuery, sortConfig, pagination]);

  const handleFilterChange = (dataIndex: string, value: string) => {
    setFilters((prev) => ({ ...prev, [dataIndex]: value }));
  };

  const handleSearchChange = (dataIndex: any, value: string) => {
    setSearchQuery((prev) => ({ ...prev, [dataIndex]: value }));
  };

  const handleSortChange = (dataKey: any) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== dataKey) {
        return { key: dataKey, direction: 'asc' };
      } else if (prev.direction === 'asc') {
        return { key: dataKey, direction: 'desc' };
      } else {
        return null;
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination({ page: 1, size: newSize });
  };

  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        const col = columns.find((c) => c.key === sortConfig.key);
        if (col?.sorter) {
          const result = col.sorter(a, b);
          return sortConfig.direction === 'asc' ? result : -result;
        }
        return 0;
      })
    : data;

  const renderCell = (value: any, column: any, record: any, index: number, className: string) => {
    switch (column.type) {
      case 'heatmap':
        return <Heatmap value={value} min={0} max={100} className={className} />;
      case 'tags':
        return <Tags tags={value} key={value.join(',')} className={className} />;
      case 'link':
        return <Link value={value} text={column.linkText} className={className} />;
      case 'date':
        return <DateTime timestamp={value} className={className} />;
      case 'currency':
        return (<span className={className}> £{value}</span>);
      default:
        return (
          <span className={className}>
            {column.render ? column.render(value, record, index) : <span>{String(value)}</span>}
          </span>
        )
      }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="relative p-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                <div className="flex items-center justify-between">
                  <span>{col.title}</span>
                  <div className="flex gap-2">
                    {col.sortable && (
                      <button 
                        data-testid={`sort-button-${col.key}`}
                        onClick={() => handleSortChange(col.key)} className="text-gray-400 hover:text-gray-800 text-xs">
                        <Image
                          src={
                            sortConfig?.key === col.key
                              ? sortConfig?.direction === 'asc'
                                ? '/sort-up.png'
                                : '/sort-down.png'
                              : '/sort.png'
                          }
                          alt="Sort Icon"
                          width={14}
                          height={14}
                        />
                      </button>
                    )}
                    {col.filterable && (
                      <div>
                        <button onClick={() => setOpenFilterPopover(openFilterPopover === col.key ? null : col.key)}>
                          <Image src="/filter.png" alt="Filter Icon" width={12} height={12} />
                        </button>
                        {openFilterPopover === col.key && (
                          <div className="absolute z-10 mt-2 right-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
                            <FilterPopover
                              isOpen={true}
                              filters={filters}
                              dataIndex={col.key}
                              filterOptions={col.filters}
                              onFilterChange={handleFilterChange}
                              onClose={() => setOpenFilterPopover(null)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {col.searchable && (
                      <div>
                        <button onClick={() => setOpenSearchPopover(openSearchPopover === col.key ? null : col.key)}>
                          <Image src="/search.png" alt="Search Icon" width={12} height={12} />
                        </button>
                        {openSearchPopover === col.key && (
                          <div className="absolute z-10 mt-2 right-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
                            <SearchPopover
                              value={searchQuery[col.key] || ''}
                              onApply={(value) => {
                                handleSearchChange(col.key, value);
                                setOpenSearchPopover(null);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((record, index) => {
            const dynamicClass = rowClass ? rowClass(record, index) : '';
            return (
              <tr key={index} className={`hover:bg-gray-50 ${dynamicClass}`}>
                {columns.map((col) => {
                  type DataRecord = Record<string, any>; // allows string-keyed access
                  const value = (record as DataRecord)[col.key];
                  return (
                    <td key={String(col.key)} className="h-12 text-sm text-gray-700 border-b border-gray-200">
                      {renderCell(value, col, record, index, 'px-4')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        page={pagination.page}
        pageSize={pagination.size}
        totalSize={totalSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}

export default DataGrid;
