import React, { useState, useEffect } from 'react';

interface SearchPopoverProps {
  value: string;
  // onChange?: (value: string) => void;
  onApply: (value: string) => void;
}

const SearchPopover: React.FC<SearchPopoverProps> = ({ value, onApply }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    // if (onChange) {
    //   onChange(val); // emit on typing if provided
    // }
  };

  const handleApply = () => {
    onApply(internalValue); // emit only on Apply click
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10 p-2">
      <input
        type="text"
        placeholder="Search..."
        className="block w-full p-2 mb-2 border rounded text-sm"
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        className="block w-full mt-1 bg-blue-500 text-white py-1 rounded text-sm"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  );
};

export default SearchPopover;
