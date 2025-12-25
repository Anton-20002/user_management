
import React, { useState } from 'react';
import { getDashboardInsights } from '../services/geminiService';
import { User, UserAction } from '../types';

interface AIInsightsProps {
  users: User[];
  actions: UserAction[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ users, actions }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generate = async () => {
    setLoading(true);
    const result = await getDashboardInsights(users, actions);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-lg border border-indigo-800 mb-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">✨</div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚡</span>
          <h3 className="text-xl font-bold">Smart Insights</h3>
        </div>
        
        {!insight ? (
          <div>
            <p className="text-indigo-200 mb-6 max-w-2xl">
              Let AI analyze your user behavior patterns, security logs, and engagement trends to provide high-level summaries and actionable advice.
            </p>
            <button 
              onClick={generate}
              disabled={loading}
              className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-indigo-50 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Data...
                </>
              ) : (
                'Generate Insights ✨'
              )}
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-indigo-100 text-lg leading-relaxed italic">
                "{insight}"
              </p>
            </div>
            <button 
              onClick={() => setInsight('')}
              className="text-indigo-300 text-sm font-bold hover:text-white flex items-center gap-1"
            >
              Refresh Analysis ↺
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
