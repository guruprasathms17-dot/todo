import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { AddTaskInput } from './components/AddTaskInput';
import { TaskList } from './components/TaskList';
import { ProgressPanel } from './components/ProgressPanel';
import type { Task, FilterType } from './types/task';
import confetti from 'canvas-confetti';
import { CheckSquare, Calendar, Clock } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'taskflow_tasks_v1';

// Initial default tasks matching the Figma design screenshot
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Finish dashboard design',
    completed: true,
    dueDate: 'Today, 2:30 PM',
    category: 'Design',
    createdAt: Date.now() - 3600000 * 5
  },
  {
    id: '2',
    title: 'Update documentation for UI kit',
    completed: false,
    dueDate: 'Today, 5:00 PM',
    category: 'Development',
    createdAt: Date.now() - 3600000 * 4
  },
  {
    id: '3',
    title: 'Review landing page copy with marketing team',
    completed: false,
    dueDate: 'Today, 6:15 PM',
    category: 'Work',
    createdAt: Date.now() - 3600000 * 3
  },
  {
    id: '4',
    title: 'Prepare presentation for client meeting',
    completed: false,
    dueDate: 'Tomorrow',
    category: 'Work',
    createdAt: Date.now() - 3600000 * 2
  },
  {
    id: '5',
    title: 'Fix minor bugs reported in QA queue',
    completed: true,
    dueDate: 'Today, 11:00 AM',
    category: 'Development',
    createdAt: Date.now() - 3600000 * 6
  },
  {
    id: '6',
    title: 'Research UI inspiration for mobile flow',
    completed: false,
    dueDate: 'Tomorrow',
    category: 'Design',
    createdAt: Date.now() - 3600000 * 1
  }
];

export function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed reading tasks from localStorage:', e);
    }
    return INITIAL_TASKS;
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [currentTab, setCurrentTab] = useState<string>('tasks');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist tasks in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed saving tasks to localStorage:', e);
    }
  }, [tasks]);

  // Dynamic greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', emoji: '☀️' };
    if (hour < 17) return { text: 'Good afternoon', emoji: '🌤️' };
    return { text: 'Good evening', emoji: '👋' };
  };

  const greeting = getGreeting();

  // Handlers
  const handleAddTask = (title: string, dueDate?: string, category?: Task['category']) => {
    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      completed: false,
      dueDate: dueDate || 'Today',
      category: category || 'Work',
      createdAt: Date.now()
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          if (nextCompleted) {
            // Trigger gentle celebratory confetti
            try {
              confetti({
                particleCount: 40,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#4F46E5', '#818CF8', '#10B981', '#F59E0B']
              });
            } catch (err) {
              // Ignore confetti errors if blocked
            }
          }
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  // Filter tasks based on search & tab
  const searchedTasks = tasks.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = t.title.toLowerCase().includes(q);
      const matchesCategory = t.category?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesCategory) return false;
    }

    if (currentTab === 'today') {
      return t.dueDate?.toLowerCase().includes('today');
    }
    if (currentTab === 'upcoming') {
      return t.dueDate?.toLowerCase().includes('tomorrow') || t.dueDate?.toLowerCase().includes('next week');
    }

    return true;
  });

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const todayCount = tasks.filter((t) => t.dueDate?.toLowerCase().includes('today')).length;
  const upcomingCount = tasks.filter((t) => t.dueDate?.toLowerCase().includes('tomorrow') || t.dueDate?.toLowerCase().includes('next week')).length;

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col lg:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar for Desktop & Off-canvas for Mobile */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        taskCounts={{
          all: totalTasks,
          today: todayCount,
          upcoming: upcomingCount,
          completed: completedTasks
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {/* Greeting Header matching Figma: "Good evening 👋" + subtitle */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{greeting.text}</span>
              <span>{greeting.emoji}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Let's get things done today and keep up the great momentum.
            </p>
          </div>

          {/* Quick Metrics / Stats Cards */}
          <div className="mb-6">
            <StatsOverview
              total={totalTasks}
              completed={completedTasks}
              pending={pendingTasks}
            />
          </div>

          {/* Add Task Input Bar */}
          <div className="mb-6">
            <AddTaskInput onAddTask={handleAddTask} />
          </div>

          {/* Main 2-Column Grid: Task List & Right Progress Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 columns: Task List */}
            <div className="lg:col-span-2">
              <TaskList
                tasks={searchedTasks}
                filter={filter}
                onFilterChange={setFilter}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onClearCompleted={handleClearCompleted}
                counts={{
                  all: tasks.length,
                  pending: pendingTasks,
                  completed: completedTasks
                }}
              />
            </div>

            {/* Right column: Circular Gauge & Motivational Cards */}
            <div className="lg:col-span-1">
              <ProgressPanel
                completed={completedTasks}
                total={totalTasks}
              />
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation Bar for quick thumb navigation */}
        <nav className="lg:hidden sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2 flex items-center justify-around">
          <button
            onClick={() => {
              setCurrentTab('tasks');
              setFilter('all');
            }}
            className={`flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition ${
              currentTab === 'tasks' ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span>My Tasks</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab('today');
            }}
            className={`flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition ${
              currentTab === 'today' ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>Today</span>
          </button>
          <button
            onClick={() => {
              setCurrentTab('upcoming');
            }}
            className={`flex flex-col items-center gap-1 py-1 text-[11px] font-semibold transition ${
              currentTab === 'upcoming' ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Upcoming</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
export default App;
