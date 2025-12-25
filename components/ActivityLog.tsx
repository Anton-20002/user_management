
import React from 'react';
import { UserAction } from '../types';

interface ActivityLogProps {
  actions: UserAction[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ actions }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security': return '🔒';
      case 'Update': return '⚙️';
      case 'Access': return '🔑';
      case 'Content': return '📝';
      default: return '📍';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Security': return 'bg-rose-500';
      case 'Update': return 'bg-blue-500';
      case 'Access': return 'bg-amber-500';
      case 'Content': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
        <button className="text-sm text-indigo-600 font-semibold hover:underline">View Full Logs</button>
      </div>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:bg-slate-100 before:w-0.5">
        {actions.map((action, idx) => (
          <div key={action.id} className="relative pl-12">
            <div className={`absolute left-2.5 top-0 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 ${getCategoryColor(action.category)}`}></div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-800">
                  {action.userName} <span className="font-normal text-slate-500">performed</span> {action.action}
                </p>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(action.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-500 italic">"{action.details}"</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-md text-slate-600 font-medium flex items-center gap-1">
                  {getCategoryIcon(action.category)} {action.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
