import React from 'react';

interface SkeletonRowProps {
  columns: any[];
}

const SkeletonRow: React.FC<SkeletonRowProps> = ({ columns }) => {
  return (
    <tr className="animate-pulse">
      {columns.map((col, index) => (
        <td key={index} className="h-12 text-sm text-gray-100 border-b border-gray-200">
          <div className="bg-gray-300 h-4 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
};

export default SkeletonRow;
