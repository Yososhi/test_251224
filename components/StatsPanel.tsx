import React from 'react';
import { DayStats } from '../types';
import { AlertCircle, Umbrella } from 'lucide-react';

interface StatsPanelProps {
  stats: DayStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const isOverBudget = stats.remainingFreeDays < 0;

  return (
    <div className="mb-6">
      {/* Low Priority Info - Simple Text Display */}
      <div className="flex flex-row gap-6 mb-3 px-1 text-sm">
        <div className="flex items-baseline text-slate-500">
          <span className="mr-2 text-slate-400">今月の平日数</span>
          <span className="font-semibold text-slate-600 text-base">{stats.totalWeekdays}</span>
          <span className="ml-0.5 text-xs text-slate-400">日</span>
        </div>
        <div className="flex items-baseline text-slate-500">
          <span className="mr-2 text-slate-400">固定稼働</span>
          <span className="font-semibold text-slate-600 text-base">{stats.requiredWorkDays}</span>
          <span className="ml-0.5 text-xs text-slate-400">日</span>
        </div>
      </div>

      {/* Main Stats - Flat Cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {/* Total Allowance - Neutral Style */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-slate-400">自由休枠(最大)</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl md:text-3xl font-bold text-slate-700 tracking-tight">
              {Math.max(0, stats.freeDaysAllowance)}
            </span>
            <span className="ml-1 text-xs text-slate-400">日</span>
          </div>
        </div>

        {/* Remaining Days - Balanced Emphasis (No Shadow, Softer Colors) */}
        <div className={`border rounded-xl p-4 flex flex-col justify-center transition-colors
          ${isOverBudget 
            ? 'bg-red-50 border-red-200' 
            : 'bg-indigo-50 border-indigo-200'
          }
        `}>
          <div className="flex items-center gap-2 mb-1">
            {isOverBudget ? (
              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            ) : (
              <Umbrella className="w-3.5 h-3.5 text-indigo-500" />
            )}
            <span className={`text-xs font-bold ${isOverBudget ? 'text-red-600' : 'text-indigo-600'}`}>
              残りの休み枠
            </span>
          </div>
          <div className="flex items-baseline">
            <span className={`text-3xl md:text-4xl font-bold tracking-tight ${isOverBudget ? 'text-red-700' : 'text-indigo-700'}`}>
              {stats.remainingFreeDays}
            </span>
            <span className={`ml-1 text-xs ${isOverBudget ? 'text-red-400' : 'text-indigo-400'}`}>日</span>
          </div>
        </div>
      </div>
    </div>
  );
};