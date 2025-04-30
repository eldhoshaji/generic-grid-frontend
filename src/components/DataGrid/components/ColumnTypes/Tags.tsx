import React from 'react';

interface TagsProps {
  tags: string[];
}

const getTagColor = (tag: string) => {
  if (tag === 'loser') return '#ff4d4f'; // volcano (red)
  if (tag.length > 5) return '#2f54eb'; // geekblue (blue)
  return '#52c41a'; // green
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {tags.map((tag, index) => (
        <span
          key={index}
          style={{
            padding: '4px 12px',
            borderRadius: '20px',
            backgroundColor: getTagColor(tag),
            color: 'white',
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'capitalize',
          }}
        >
          {tag.toUpperCase()}
        </span>
      ))}
    </div>
  );
};

export default Tags;