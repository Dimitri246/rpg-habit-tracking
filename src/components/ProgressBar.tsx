import React from 'react';

interface Props {
  label: string;
  value: number;
  max: number;
  color: string;
}

const ProgressBar: React.FC<Props> = ({ label, value, max, color }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full bg-gray-200 rounded h-3" aria-label={label}>
      <div className={`${color} h-3 rounded`} style={{ width: `${pct}%` }} />
      <span className="sr-only">{label} {value}/{max}</span>
    </div>
  );
};

export default ProgressBar;
