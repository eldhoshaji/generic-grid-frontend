import React from 'react';

interface LinkProps {
  value: string;
  text?: string;
}

const Link: React.FC<LinkProps> = ({ value, text }) => {
  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#1677ff', textDecoration: 'underline' }}
    >
      {text || value}
    </a>
  );
};

export default Link;
