import React from 'react';
import { CheckCircle2, Clock, ListTodo, ArrowUpRight } from 'lucide-react';

interface StatsOverviewProps {
  total: number;
  completed: number;
  pending: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  total,
  completed,
  pending
}) => {
  const cards = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: total,
      subtext: 'All tasks in workspace',
      icon: ListTodo,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/80',
      arrowColor: 'text-indigo-400'
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completed,
      subtext: 'Tasks done so far',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/80',
      arrowColor: 'text-emerald-400'
    },
    {
      id: 'pending',
      label: 'Pending',
      value: pending,
      subtext: 'Tasks still to do',
      icon: Clock,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50/80',
      arrowColor: 'text-amber-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-200 relative group overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {card.label}
                </span>
                <h3 className="text-3xl font-bold text-slate-900 mt-1.5 tracking-tight font-['Plus_Jakarta_Sans']">
                  {card.value}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">{card.subtext}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <ArrowUpRight className={`w-4 h-4 ${card.arrowColor} opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                <div className={`p-2.5 rounded-xl ${card.bgColor} ${card.iconColor} transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Subtle bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${card.bgColor}`} />
          </div>
        );
      })}
    </div>
  );
};
