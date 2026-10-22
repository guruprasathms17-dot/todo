import React from 'react';
import { 
  Check, 
  Trash2, 
  Clock, 
  GripVertical
} from 'lucide-react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete
}) => {
  const getCategoryBadge = (cat?: Task['category']) => {
    switch (cat) {
      case 'Design':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'Development':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'Work':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Personal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200/60';
    }
  };

  return (
    <div
      className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border transition-all duration-200 ${
        task.completed
          ? 'border-slate-100 bg-slate-50/50 opacity-75'
          : 'border-slate-200/80 hover:border-indigo-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {/* Drag handle hint for visual fidelity */}
        <div className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Custom Rounded Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark task pending' : 'Mark task completed'}
          className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            task.completed
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs shadow-indigo-500/30'
              : 'border-slate-300 hover:border-indigo-500 bg-white'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Title & Details */}
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm sm:text-base font-medium truncate transition-all ${
              task.completed
                ? 'line-through text-slate-400 font-normal'
                : 'text-slate-800'
            }`}
          >
            {task.title}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            {task.dueDate && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{task.dueDate}</span>
              </span>
            )}

            {task.category && (
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getCategoryBadge(
                  task.category
                )}`}
              >
                {task.category}
              </span>
            )}

            {task.completed && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 pl-2">
        <button
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-80 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
