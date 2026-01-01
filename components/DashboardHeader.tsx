
import React from 'react';
import { Home, Users, Settings, Bell } from 'lucide-react';

interface Props {
  title: string;
  subtitle: string;
}

const DashboardHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg text-white font-bold text-xl">N</div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Clinical BI Dashboard <span className="mx-1">•</span> 2024 V3
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-slate-600">
              <Home className="w-5 h-5 cursor-pointer hover:text-blue-600 transition" />
              <Users className="w-5 h-5 cursor-pointer hover:text-blue-600 transition" />
              <Settings className="w-5 h-5 cursor-pointer hover:text-blue-600 transition" />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full border border-white">2</span>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-800">林雅筑 營養師</p>
                <p className="text-[10px] text-slate-500">台北長青日間照顧中心</p>
              </div>
              <img src="https://picsum.photos/seed/nurse/40/40" className="w-10 h-10 rounded-full ring-2 ring-slate-50" alt="Avatar" />
            </div>
          </div>
        </div>
        {/* Banner area */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100/50">
          <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">{subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
