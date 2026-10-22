import React from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  Calendar as CalendarIcon 
} from 'lucide-react';

interface NavbarProps {
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange
}) => {
  // Format current date matching Figma: "Thursday, 22 Oct 2026"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left side: Hamburger button + Breadcrumbs / Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="text-slate-800 font-semibold hidden sm:inline">Workspace</span>
          <span className="hidden sm:inline">/</span>
          <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">
            My Tasks
          </span>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks, categories..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition"
          />
        </div>
      </div>

      {/* Right side: Date, Notifications, and Avatar */}
      <div className="flex items-center gap-3">
        {/* Date Display */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
          <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
          <span>{formattedDate}</span>
        </div>

        {/* Notifications Icon */}
        <button 
          aria-label="View notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition cursor-pointer"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="w-2 h-2 rounded-full bg-indigo-600 absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        {/* Mobile quick avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-xs lg:hidden">
          GP
        </div>
      </div>
    </header>
  );
};
