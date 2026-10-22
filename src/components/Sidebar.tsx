import React from 'react';
import { 
  CheckSquare, 
  Calendar, 
  Clock, 
  Star, 
  Settings, 
  Zap,
  TrendingUp,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  taskCounts: {
    all: number;
    today: number;
    upcoming: number;
    completed: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  isOpenMobile,
  onCloseMobile,
  taskCounts
}) => {
  const navItems = [
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, count: taskCounts.all },
    { id: 'today', label: 'Today', icon: Clock, count: taskCounts.today },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar, count: taskCounts.upcoming },
    { id: 'important', label: 'Important', icon: Star, count: 0 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, count: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-100/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } lg:static lg:h-screen lg:z-auto`}
      >
        <div className="p-6">
          {/* Logo / Brand Header */}
          <div className="flex items-center justify-between pb-6 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold text-lg tracking-wider">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-800 tracking-tight flex items-center gap-1 font-['Plus_Jakarta_Sans']">
                  TaskFlow
                </span>
                <span className="block text-[10px] text-slate-400 font-medium -mt-1 tracking-wider uppercase">Workspace</span>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 pt-3 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Navigation</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && item.count > 0 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-indigo-100/80 text-indigo-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Productivity Tip Box */}
          <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-violet-50/50 border border-indigo-100/60 relative overflow-hidden">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5 shadow-xs">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Quick Productivity Tip</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Press <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-slate-200 rounded text-slate-700 shadow-2xs font-mono">Enter</kbd> to quickly capture any new task idea!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer User Profile */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-semibold flex items-center justify-center text-xs ring-2 ring-indigo-100">
                GP
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-slate-800 leading-none">Guru Prasath</p>
                <p className="text-[11px] text-slate-400 leading-tight mt-1">Free Workspace</p>
              </div>
            </div>
            <button 
              className="text-slate-400 hover:text-slate-600 p-1"
              aria-label="Settings"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
