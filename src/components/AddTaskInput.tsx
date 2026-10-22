import React, { useState } from 'react';
import { Plus, Calendar, Tag, CornerDownLeft } from 'lucide-react';
import type { Task } from '../types/task';

interface AddTaskInputProps {
  onAddTask: (title: string, dueDate?: string, category?: Task['category']) => void;
}

export const AddTaskInput: React.FC<AddTaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('Today');
  const [category, setCategory] = useState<Task['category']>('Design');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;

    onAddTask(title.trim(), dueDate, category);
    setTitle('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/90 shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-200">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <div className="flex-1 flex items-center gap-3 px-3">
          <div className="w-5 h-5 rounded-md border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0">
            <Plus className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <input
            type="text"
            id="task-input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task and press Enter..."
            className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none font-normal"
            autoComplete="off"
          />
        </div>

        {/* Action Controls & Submit Button */}
        <div className="flex items-center justify-between sm:justify-end gap-2 px-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="flex items-center gap-1.5">
            {/* Due Date Selector */}
            <div className="relative">
              <select
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100/80 text-slate-600 text-xs font-medium py-1.5 pl-7 pr-3 rounded-lg border border-slate-200/80 cursor-pointer outline-none transition"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Next Week">Next Week</option>
                <option value="No Date">No Date</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Category Selector */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Task['category'])}
                className="appearance-none bg-slate-50 hover:bg-slate-100/80 text-slate-600 text-xs font-medium py-1.5 pl-7 pr-3 rounded-lg border border-slate-200/80 cursor-pointer outline-none transition"
              >
                <option value="Design">Design</option>
                <option value="Development">Dev</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>
              <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Add Task Button */}
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-indigo-500/25 active:scale-98 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Add Task</span>
            <CornerDownLeft className="w-3.5 h-3.5 opacity-80 hidden sm:inline" />
          </button>
        </div>
      </form>
    </div>
  );
};
