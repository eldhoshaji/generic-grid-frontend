import React from 'react';

interface LinkProps {
  value: string;
  text?: string;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ value, text, className }) => {
  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ color: '#1677ff', textDecoration: 'underline' }}
    >
      {text || value}
    </a>
  );
};

export default Link;
