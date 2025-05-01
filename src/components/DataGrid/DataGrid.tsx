import React, { useEffect, useRef, useState } from 'react';
import { DataGridProps } from '@/types/table';
import FilterPopover from '@/components/DataGrid/components/FilterPopover';
import SearchPopover from '@/components/DataGrid/components/SearchPopover';
import Heatmap from '@/components/DataGrid/components/ColumnTypes/Heatmap';
import Tags from '@/components/DataGrid/components/ColumnTypes/Tags';
import Link from '@/components/DataGrid/components/ColumnTypes/Link';
import DateTime from '@/components/DataGrid/components/ColumnTypes/DateTime';
import Image from 'next/image';
import Pagination from '@/components/Datagrid/components/Pagination';
import SkeletonRow from './components/Skelton';

function DataGrid<T>({
  columns,
  data,
  totalSize,
  onChange,
  filters: parentFilters = {},
  searchQuery: parentSearchQuery = null,
  sortConfig: parentSortConfig = null,
  pagination: parentPagination = { page: 1, size: 10 },
  rowClass,
  enablePagination = false,
  loading = false
}: DataGridProps<T>) {
  const [filters, setFilters] = useState<{ [key: string]: any }>(parentFilters);
  const [searchQuery, setSearchQuery] = useState<{ key: string; value: string } | null>(parentSearchQuery);
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

  const handleFilterChange = (key: string, value: string | null) => {
    if (value === null) {
      setFilters({});
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSearchChange = (key: any, value: string) => {
    setSearchQuery((prev) => ({ ...prev, key, value}));
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


    const filteredData = filters && Object.keys(filters).length
    ? sortedData.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          const col = columns.find((c) => c.key === key);
          if (col?.onFilter) {
            return col.onFilter(value, item);
          }
          return String((item as Record<string, any>)[key]).toLowerCase().includes(String(value).toLowerCase());
        });
      })
    : sortedData;

  const searchData = searchQuery && searchQuery.key
    ? filteredData.filter((item) => {
        const col = columns.find((c) => c.key === searchQuery.key);
        if (col?.onSearch) {
          return col.onSearch(searchQuery.value, item);
        }
        return String((item as Record<string, any>)[searchQuery.key]).toLowerCase().includes(searchQuery.value.toLowerCase());
      })
    : filteredData;

  const paginatedData = enablePagination
  ? searchData.slice(
      (pagination.page - 1) * pagination.size,
      pagination.page * pagination.size
    )
  : searchData;


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
              <th key={String(col.key)} data-testid={`header-${col.key}`} className="relative p-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                <div className="flex items-center justify-between">
                  <span>{col.title}</span>
                  <div className="flex gap-2">
                    {col.sortable && (
                      <button 
                        data-testid={`sort-button-${col.key}`}
                        onClick={() => handleSortChange(col.key)} 
                        className="text-gray-400 hover:text-gray-800 text-xs cursor-pointer">
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
                        <button 
                          data-testid={`filter-button-${col.key}`}
                          className='cursor-pointer'
                          onClick={() => setOpenFilterPopover(openFilterPopover === col.key ? null : col.key)}>
                          <Image src="/filter.png" alt="Filter Icon" width={12} height={12} />
                        </button>
                        {openFilterPopover === col.key && (
                          <div className="absolute z-10 mt-2 right-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
                            <FilterPopover
                              data-testid={`filter-popover-${col.key}`}
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
                        <button 
                          data-testid={`search-button-${col.key}`}
                          className='cursor-pointer'
                          onClick={() => setOpenSearchPopover(openSearchPopover === col.key ? null : col.key)}>
                          <Image src="/search.png" alt="Search Icon" width={12} height={12} />
                        </button>
                        {openSearchPopover === col.key && (
                          <div className="absolute z-10 mt-2 right-0 w-48 bg-white border border-gray-300 rounded shadow-lg">
                            <SearchPopover
                              data-testid={`search-popover-${col.key}`}
                              value={searchQuery?.value || ''}
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
        { loading ? (
            Array(10).fill(0).map((_, index) => (
              <SkeletonRow key={index} columns={columns} />
            ))
          ) : paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center h-50 py-4 text-gray-500 bg-gray-50">
               No data available
              </td>
            </tr>
          ) : (
            paginatedData.map((record, index) => {
              const dynamicClass = rowClass ? rowClass(record, index) : '';
              return (
                <tr data-testid={`row-${index}`} key={index} className={`hover:bg-gray-50 ${dynamicClass}`}>
                  {columns.map((col) => {
                    type DataRecord = Record<string, any>; // allows string-keyed access
                    const value = (record as DataRecord)[col.key];
                    return (
                      <td key={String(col.key)} data-testid={`cell-${index}-${col.key}`} className="h-12 text-sm text-gray-700 border-b border-gray-200">
                        {renderCell(value, col, record, index, 'px-4')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
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
