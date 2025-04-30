import React from 'react';

interface LinkProps {
  value: string;
  text?: string;
  className?: string; // Added className as an optional prop
}

const Link: React.FC<LinkProps> = ({ value, text, className }) => {
  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className={className} // Apply className for custom styling
      style={{ color: '#1677ff', textDecoration: 'underline' }} // Default inline styles
    >
      {text || value}
    </a>
  );
};

export default Link;
