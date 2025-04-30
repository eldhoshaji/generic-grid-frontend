import React from 'react';

interface DateTimeProps {
  timestamp: string;
}

const DateTime: React.FC<DateTimeProps> = ({ timestamp }) => {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  
  return (
    <span>{formattedDate}</span>
   )
};

export default DateTime;
