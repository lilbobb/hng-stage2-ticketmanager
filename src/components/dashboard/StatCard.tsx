import React from 'react';

interface StatCardProps {
  value: number;
  label: string;
  color: 'indigo' | 'green' | 'amber' | 'gray';
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => {
  const colors = {
    indigo: 'text-indigo-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    gray: 'text-gray-600'
  };

  return (
    <div className="bg-[#0B0B12] p-6 rounded-xl shadow-lg border border-gray-500">
      <div className={`text-3xl font-bold mb-2 ${colors[color]}`}>{value}</div>
      <div className="text-[#9CA3AF] font-medium">{label}</div>
    </div>
  );
};