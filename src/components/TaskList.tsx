import React from 'react';
import type { Task, FilterType } from '../types/task';
import { TaskItem } from './TaskItem';
import { Inbox, Sparkles } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onClearCompleted?: () => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filter,
  onFilterChange,
  onToggleTask,
  onDeleteTask,
  onClearCompleted,
  counts
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header and Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight font-['Plus_Jakarta_Sans']">
            My Tasks
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage and organize your day-to-day priorities
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl self-start sm:self-auto border border-slate-200/50">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All <span className="opacity-75 text-[11px] ml-0.5">({counts.all})</span>
          </button>
          <button
            onClick={() => onFilterChange('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'pending'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Pending <span className="opacity-75 text-[11px] ml-0.5">({counts.pending})</span>
          </button>
          <button
            onClick={() => onFilterChange('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'completed'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Completed <span className="opacity-75 text-[11px] ml-0.5">({counts.completed})</span>
          </button>
        </div>
      </div>

      {/* List items */}
      <div className="space-y-2.5">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="py-12 px-4 text-center rounded-2xl bg-white border border-dashed border-slate-200 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
              {filter === 'completed' ? (
                <Inbox className="w-6 h-6" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
            </div>
            <h4 className="text-sm font-semibold text-slate-800">
              {filter === 'completed'
                ? 'No completed tasks yet'
                : filter === 'pending'
                ? 'No pending tasks left!'
                : 'Your task list is empty'}
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              {filter === 'completed'
                ? 'Mark items off your list to watch your completed tasks grow here.'
                : 'Add a new priority using the input box above to start tracking.'}
            </p>
          </div>
        )}
      </div>

      {/* Footer list summary & bulk action */}
      {filteredTasks.length > 0 && (
        <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-400">
          <span>
            Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </span>
          {counts.completed > 0 && onClearCompleted && (
            <button
              onClick={onClearCompleted}
              className="text-rose-500 hover:text-rose-600 font-medium transition cursor-pointer"
            >
              Clear Completed
            </button>
          )}
        </div>
      )}
    </div>
  );
};
