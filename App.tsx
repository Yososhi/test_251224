import React, { useState, useMemo, useEffect } from 'react';
import { 
  addMonths, 
  subMonths, 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSaturday, 
  isSunday 
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar } from './components/Calendar';
import { StatsPanel } from './components/StatsPanel';
import { DayStats } from './types';
import { downloadIcsFile } from './services/calendarService';
import { ChevronLeft, ChevronRight, Info, Download, Calendar as CalendarIcon } from 'lucide-react';

// Constant: User works 18 days a month
const FIXED_WORK_DAYS = 18;

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  // Persist selected off days in localStorage
  const [selectedOffDays, setSelectedOffDays] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('work_manager_off_days');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('work_manager_off_days', JSON.stringify(Array.from(selectedOffDays)));
  }, [selectedOffDays]);

  const handlePrevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  const stats: DayStats = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start, end });

    // Calculate basic month stats
    let totalWeekdays = 0;
    const weekdaysInMonth: string[] = [];

    daysInMonth.forEach(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const isWeekend = isSaturday(day) || isSunday(day);
      
      // Calculate total potential workdays.
      // Holidays on weekdays are counted as potential workdays now.
      if (!isWeekend) {
        totalWeekdays++;
        weekdaysInMonth.push(dateStr);
      }
    });

    const freeDaysAllowance = Math.max(0, totalWeekdays - FIXED_WORK_DAYS);
    
    // Calculate how many "off" days the user has selected within THIS month
    let daysTakenOff = 0;
    weekdaysInMonth.forEach(dateStr => {
      if (selectedOffDays.has(dateStr)) {
        daysTakenOff++;
      }
    });

    const remainingFreeDays = freeDaysAllowance - daysTakenOff;

    return {
      totalDays: daysInMonth.length,
      totalWeekdays,
      requiredWorkDays: FIXED_WORK_DAYS,
      freeDaysAllowance,
      daysTakenOff,
      remainingFreeDays
    };
  }, [currentDate, selectedOffDays]);

  const toggleOffDay = (dateStr: string) => {
    const newSet = new Set(selectedOffDays);
    if (newSet.has(dateStr)) {
      newSet.delete(dateStr);
    } else {
      newSet.add(dateStr);
    }
    setSelectedOffDays(newSet);
  };

  const handleExport = () => {
    // Get all selected days that fall within the current month view
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const daysInView = eachDayOfInterval({ start, end }).map(d => format(d, 'yyyy-MM-dd'));
    
    // Filter selectedOffDays to only include those in current month
    const exportDates = daysInView.filter(dateStr => selectedOffDays.has(dateStr));
    
    if (exportDates.length === 0) {
      alert("今月の自由休が選択されていません。");
      return;
    }
    
    downloadIcsFile(exportDates);
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-md">
        <div className="max-w-6xl mx-auto px-3 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          
          {/* Left: Logo Area */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base md:text-lg">18</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight hidden md:block">
              Work Schedule Manager
            </h1>
          </div>

          {/* Center/Right: Big Month Switcher */}
          <div className="flex items-center bg-slate-100 p-1 md:p-1.5 rounded-xl md:rounded-2xl shadow-inner">
             <button 
               onClick={handlePrevMonth}
               className="h-10 w-12 md:h-12 md:w-14 flex items-center justify-center bg-white hover:bg-slate-50 rounded-lg md:rounded-xl shadow-sm border border-slate-200 transition-all active:scale-95 active:shadow-inner"
               aria-label="Previous Month"
             >
               <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-slate-700" />
             </button>
             
             <span className="px-3 md:px-6 min-w-[120px] md:min-w-[160px] text-center text-lg md:text-2xl font-bold text-slate-800 select-none">
               {format(currentDate, 'yyyy年 M月', { locale: ja })}
             </span>
             
             <button 
               onClick={handleNextMonth}
               className="h-10 w-12 md:h-12 md:w-14 flex items-center justify-center bg-white hover:bg-slate-50 rounded-lg md:rounded-xl shadow-sm border border-slate-200 transition-all active:scale-95 active:shadow-inner"
               aria-label="Next Month"
             >
               <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-slate-700" />
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-2 md:px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        
        {/* Statistics Dashboard */}
        <StatsPanel stats={stats} />

        {/* Calendar */}
        <Calendar 
          currentDate={currentDate} 
          selectedOffDays={selectedOffDays} 
          onToggleOffDay={toggleOffDay} 
        />

        {/* Legend & Actions Row */}
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-slate-500">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-white border border-slate-300 rounded"></div>
              <span>稼働日</span>
            </div>
             <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-emerald-50 border border-emerald-200 rounded"></div>
              <span>自由休(選択済)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-red-50 border border-red-100 rounded"></div>
              <span>日本祝日</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-50 border border-orange-100 rounded"></div>
              <span>台湾祝日</span>
            </div>
          </div>

          {/* Export Action */}
          <button 
            onClick={handleExport}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>カレンダー書き出し(.ics)</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="mt-6 md:mt-8 bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4 flex items-start space-x-3">
          <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-blue-800 leading-relaxed space-y-1">
            <p>
              毎月の固定稼働日数は<span className="font-bold">18日</span>です。
              平日（土日以外）の数から、自動的に今月の「自由休枠」を計算しています。
            </p>
            <p>
              <span className="font-bold">Googleカレンダー連携:</span> 自由休の日付にある <CalendarIcon className="inline w-3 h-3" /> ボタンを押すと、その日の予定作成画面が開きます。
              「カレンダー書き出し」ボタンで、今月の休みをまとめてカレンダーアプリに取り込めます。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;