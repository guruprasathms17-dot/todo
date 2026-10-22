import React from 'react';
import { ArrowUpRight, Award, Zap } from 'lucide-react';

interface ProgressPanelProps {
  completed: number;
  total: number;
}

export const ProgressPanel: React.FC<ProgressPanelProps> = ({
  completed,
  total
}) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // SVG Circular Gauge calculation
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* Main Progress Ring Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs relative">
        <div className="flex items-center justify-between pb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Your Progress
          </span>
          <ArrowUpRight className="w-4 h-4 text-indigo-400" />
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background Ring */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-slate-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-indigo-600 transition-all duration-700 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Percentage Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight font-['Plus_Jakarta_Sans']">
                {percentage}%
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-0.5">Completed</span>
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="text-xs font-bold text-slate-800">
              {completed} of {total} Tasks Completed
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {percentage === 100 && total > 0
                ? '🎉 Excellent work! All tasks done.'
                : percentage >= 50
                ? '🔥 Over halfway through your goals!'
                : '🚀 Keep going, you can do this!'}
            </p>
          </div>
        </div>
      </div>

      {/* Focus & Productivity Card Matching Figma */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-5 text-white shadow-md shadow-indigo-500/20 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-indigo-400/20 blur-lg pointer-events-none" />

        <div className="relative z-10">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-white" />
          </div>

          <h4 className="text-sm font-bold tracking-tight">Stay Productive</h4>
          <p className="text-xs text-indigo-100/90 mt-1 leading-relaxed">
            Break larger projects down into small, achievable tasks and tackle them one by one.
          </p>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
            <span className="text-indigo-200">Daily Goal</span>
            <span className="font-semibold text-white">{completed} / {Math.max(total, 5)} done</span>
          </div>
        </div>
      </div>

      {/* Mini Motivational Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-800">Productivity Streak</h5>
          <p className="text-[11px] text-slate-400 mt-0.5">Active streak: 3 days in a row</p>
        </div>
      </div>
    </div>
  );
};
