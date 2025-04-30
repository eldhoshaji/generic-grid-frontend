import React from 'react';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  totalSize,
  onPageChange,
  onPageSizeChange
}) => {
  const totalPages = Math.ceil(totalSize / pageSize);

  return (
    <div className="flex justify-between items-center mt-4 px-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages} | Total Records: {totalSize}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div>
        <select
          className="border p-1 rounded"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {[10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
