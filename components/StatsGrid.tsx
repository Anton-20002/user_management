
import React from 'react';
import { DashboardStats } from '../types';

interface StatsGridProps {
  stats: DashboardStats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const cards = [
    { label: 'Total Users', value: stats.totalUsers, change: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Now', value: stats.activeNow, change: '+5%', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'New This Week', value: stats.newThisWeek, change: '+8%', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg Engagement', value: `${stats.avgEngagement}%`, change: '-2%', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 font-medium text-sm">{card.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${card.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {card.change}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-800">{card.value}</h3>
          </div>
          <div className={`h-1 w-full rounded-full mt-4 ${card.bg}`}>
            <div className={`h-full rounded-full ${card.color.replace('text', 'bg')}`} style={{ width: '65%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
