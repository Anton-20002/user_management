
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import StatsGrid from './components/StatsGrid';
import ChartsSection from './components/ChartsSection';
import UserTable from './components/UserTable';
import ActivityLog from './components/ActivityLog';
import AIInsights from './components/AIInsights';
import { INITIAL_USERS, INITIAL_ACTIONS } from './constants';
import { User, UserAction, DashboardStats, UserStatus } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [actions, setActions] = useState<UserAction[]>(INITIAL_ACTIONS);
  const [searchTerm, setSearchTerm] = useState('');

  const stats: DashboardStats = useMemo(() => ({
    totalUsers: users.length * 248, // Simulated larger number
    activeNow: users.filter(u => u.status === UserStatus.ACTIVE).length * 42,
    newThisWeek: 45,
    avgEngagement: 78
  }), [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleUserAction = (userId: string, type: 'delete' | 'edit' | 'suspend') => {
    if (type === 'delete') {
      if (confirm('Are you sure you want to delete this user?')) {
        setUsers(prev => prev.filter(u => u.id !== userId));
      }
    } else if (type === 'suspend') {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: UserStatus.SUSPENDED } : u));
    } else {
      alert(`Edit functionality for user ${userId} would open here.`);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-10 max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'dashboard' ? 'Platform Overview' : 
               activeTab === 'users' ? 'User Management' : 
               activeTab === 'history' ? 'Audit Trail' : 'System Settings'}
            </h2>
            <p className="text-slate-500 mt-1 font-medium">Welcome back, Administrator</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-indigo-600">
                🔍
              </span>
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl w-72 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition-all shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm relative">
              🔔
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <img src="https://picsum.photos/seed/admin/100" className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm" alt="Admin" />
              <div className="hidden xl:block">
                <p className="text-sm font-bold text-slate-900">Alex Thompson</p>
                <p className="text-xs text-indigo-600 font-bold">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-500">
            <AIInsights users={users} actions={actions} />
            <StatsGrid stats={stats} />
            <ChartsSection />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <UserTable users={filteredUsers.slice(0, 5)} onAction={handleUserAction} />
              </div>
              <div className="lg:col-span-1">
                <ActivityLog actions={actions} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <UserTable users={filteredUsers} onAction={handleUserAction} />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 gap-8">
             <ActivityLog actions={[...actions, ...actions]} />
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-4">Filtering & Export</h3>
                <p className="text-slate-500 mb-4">Export detailed logs for compliance and auditing. Select date ranges below.</p>
                <div className="flex gap-4">
                  <input type="date" className="p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                  <input type="date" className="p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">Apply Filters</button>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 max-w-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Dashboard Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="font-bold">Real-time Notifications</p>
                    <p className="text-sm text-slate-500">Receive alerts when security events occur.</p>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="font-bold">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500">Required for all administrator accounts.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-300 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  Save System Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
