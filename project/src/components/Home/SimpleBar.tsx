import React from 'react';

interface SimpleBarProps {
  value: number;
  label?: string;
}

export const SimpleBar: React.FC<SimpleBarProps> = ({ value, label }) => (
  <div className="mb-4">
    {label && <div className="text-gray-400 text-sm mb-1">{label}</div>}
    <div className="w-full h-3 bg-[#2d2d2d] rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#3b82f6] rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
    <div className="text-xs text-gray-400 mt-1">{value}%</div>
  </div>
);
