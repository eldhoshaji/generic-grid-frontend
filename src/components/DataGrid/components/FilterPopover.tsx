// components/FilterPopover.tsx
import React from 'react';

interface FilterPopoverProps {
  isOpen: boolean;
  filters: any;
  dataIndex: string;
  filterOptions?: { text: string; value: any }[];
  enableSearch?: boolean;
  onFilterChange: (dataIndex: string, value: string | null) => void;
  onClose: () => void;
}

export default function FilterPopover({
  isOpen,
  filters,
  dataIndex,
  filterOptions,
  enableSearch,
  onFilterChange,
  onClose,
}: FilterPopoverProps) {
  if (!isOpen) return null;

  return (
    <div
      data-testid="filter-popover"
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10 p-2"
      onClick={(e) => e.stopPropagation()}
    >
      {enableSearch && (
        <input
          type="text"
          placeholder="Search..."
          className="block w-full p-2 mb-2 border rounded text-sm"
          value={filters[dataIndex] || ''}
          onChange={(e) => onFilterChange(dataIndex, e.target.value)}
        />
      )}
      {filterOptions && (
        <select
          className="block w-full p-2 mb-2 border rounded text-sm"
          onChange={(e) => onFilterChange(dataIndex, e.target.value)}
          data-testid={`filter-select-${dataIndex}`}
          value={filters[dataIndex] || ''}
        >
          {filterOptions.map((f) => (
            <option key={f.value} value={f.value}>
              {f.text}
            </option>
          ))}
        </select>
      )}
      <div className='flex gap-2'>
        <button
          data-testid="filter-popover-clear"
          className="block w-full mt-1 bg-red-400 text-white py-1 rounded text-sm"
          onClick={()=>onFilterChange(dataIndex, null)}
        >
          Clear
        </button>
        <button
          data-testid="filter-popover-apply"
          className="block w-full mt-1 bg-blue-400 text-white py-1 rounded text-sm"
          onClick={onClose}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
