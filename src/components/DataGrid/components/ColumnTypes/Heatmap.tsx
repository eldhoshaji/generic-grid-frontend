import React from 'react';

interface HeatmapProps {
  value: number;
  min: number;
  max: number;
  className?: string; // Add className as an optional prop
}

const getHeatmapColor = (value: number, min: number, max: number): string => {
  const ratio = (value - min) / (max - min);
  const red = Math.min(255, Math.floor(255 * ratio));
  const blue = Math.min(255, Math.floor(255 * (1 - ratio)));
  return `rgb(${red}, 0, ${blue})`;
};

const Heatmap: React.FC<HeatmapProps> = ({ value, min, max, className }) => {
  const backgroundColor = getHeatmapColor(value, min, max);

  return (
    <div
      className={`w-full h-full flex items-center justify-center text-white font-medium ${className}`}
      style={{ backgroundColor }}
    >
      {value}
    </div>
  );
};

export default Heatmap;
