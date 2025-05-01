import React, { useState, useEffect } from 'react';

interface SearchPopoverProps {
  value: string;
  onApply: (value: string) => void;
}

const SearchPopover: React.FC<SearchPopoverProps> = ({ value, onApply }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInternalValue(val);
  };

  const handleApply = () => {
    onApply(internalValue);
  };

  return (
    <div data-testid="search-popover" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10 p-2">
      <input
        data-testid="search-popover-input"
        type="text"
        placeholder="Search..."
        className="block w-full p-2 mb-2 border rounded text-sm"
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          data-testid="search-popover-clear"
          className="block w-full mt-1 bg-red-400 text-white py-1 rounded text-sm"
          onClick={() => {onApply('')}}
        >
          Clear
        </button>
        <button
          data-testid="search-popover-apply"
          className="block w-full mt-1 bg-blue-400 text-white py-1 rounded text-sm"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SearchPopover;
