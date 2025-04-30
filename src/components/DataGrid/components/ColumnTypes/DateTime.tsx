import React from 'react';

interface DateTimeProps {
  timestamp: string;
  className?: string; // Add className as an optional prop
}

const DateTime: React.FC<DateTimeProps> = ({ timestamp, className }) => {
  const formattedDate = new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <span className={className}>{formattedDate}</span> // Apply className
  );
};

export default DateTime;
