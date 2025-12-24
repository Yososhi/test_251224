import React from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isToday,
  isSaturday, 
  isSunday
} from 'date-fns';
import { getHolidays } from '../services/holidayService';
import { generateGoogleCalendarUrl } from '../services/calendarService';
import { DayType } from '../types';
import { Check, CalendarPlus } from 'lucide-react';

interface CalendarProps {
  currentDate: Date;
  selectedOffDays: Set<string>;
  onToggleOffDay: (dateStr: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ currentDate, selectedOffDays, onToggleOffDay }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ['月', '火', '水', '木', '金', '土', '日'];

  const getDayType = (date: Date, dateStr: string): DayType => {
    const holidays = getHolidays(dateStr);
    const hasJP = holidays.some(h => h.country === 'JP');
    const hasTW = holidays.some(h => h.country === 'TW');

    if (hasJP && hasTW) return DayType.HolidayBoth;
    if (hasJP) return DayType.HolidayJP;
    if (hasTW) return DayType.HolidayTW;
    
    if (isSunday(date)) return DayType.Sunday;
    if (isSaturday(date)) return DayType.Saturday;
    return DayType.Weekday;
  };

  const handleGoogleCalendarClick = (e: React.MouseEvent, dateStr: string) => {
    e.stopPropagation();
    const url = generateGoogleCalendarUrl(dateStr);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header Row */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {weekDays.map((day, idx) => (
          <div 
            key={day} 
            className={`py-2 md:py-3 text-center text-xs md:text-sm font-semibold ${
              idx === 5 ? 'text-blue-600' : idx === 6 ? 'text-red-600' : 'text-slate-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 auto-rows-fr bg-slate-200 gap-px">
        {calendarDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isCurrentMonth = isSameMonth(day, monthStart);
          const holidays = getHolidays(dateStr);
          const dayType = getDayType(day, dateStr);
          const isOff = selectedOffDays.has(dateStr);
          
          const isWeekend = isSaturday(day) || isSunday(day);
          
          // Interaction is allowed for current month weekdays (Mon-Fri)
          const isInteractive = isCurrentMonth && !isWeekend;

          let bgClass = 'bg-white';
          let textClass = 'text-slate-900';

          if (!isCurrentMonth) {
            bgClass = 'bg-slate-50';
            textClass = 'text-slate-300';
          } else if (isOff) {
            bgClass = 'bg-emerald-50 hover:bg-emerald-100 cursor-pointer';
            textClass = 'text-emerald-700 font-medium';
          } else if (dayType === DayType.HolidayJP) {
            bgClass = 'bg-red-50';
            if (isInteractive) bgClass += ' hover:bg-red-100 cursor-pointer';
            textClass = 'text-red-600 font-medium';
          } else if (dayType === DayType.HolidayTW) {
            bgClass = 'bg-orange-50';
            if (isInteractive) bgClass += ' hover:bg-orange-100 cursor-pointer';
            textClass = 'text-orange-600 font-medium';
          } else if (dayType === DayType.HolidayBoth) {
            bgClass = 'bg-purple-50';
            if (isInteractive) bgClass += ' hover:bg-purple-100 cursor-pointer';
            textClass = 'text-purple-600 font-medium';
          } else if (dayType === DayType.Sunday) {
            bgClass = 'bg-white';
            textClass = 'text-red-500';
          } else if (dayType === DayType.Saturday) {
            bgClass = 'bg-white';
            textClass = 'text-blue-500';
          } else {
            // Normal weekday
            bgClass = 'bg-white hover:bg-slate-50 cursor-pointer';
          }

          if (isToday(day)) {
            textClass += ' font-bold underline decoration-blue-500 decoration-2 underline-offset-4';
          }

          return (
            <div 
              key={dateStr}
              onClick={() => isInteractive && onToggleOffDay(dateStr)}
              className={`
                relative min-h-[56px] md:min-h-[100px] p-1 md:p-2 flex flex-col justify-between transition-all duration-200 group
                ${bgClass}
                ${isInteractive ? 'active:scale-[0.98]' : ''}
              `}
            >
              <div className="flex justify-between items-start">
                <span className={`text-xs md:text-sm ${textClass}`}>
                  {format(day, 'd')}
                </span>
                {isOff && (
                  <span className="bg-emerald-500 text-white p-0.5 rounded-full shadow-sm">
                    <Check className="w-2 h-2 md:w-3 md:h-3" />
                  </span>
                )}
              </div>
              
              <div className="mt-0.5 md:mt-1 flex flex-col gap-0.5 md:gap-1">
                 {holidays.map((h, i) => (
                  <span 
                    key={i} 
                    className={`text-[8px] md:text-[10px] leading-tight px-1 py-0.5 rounded w-fit max-w-full truncate
                      ${h.country === 'JP' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-orange-100 text-orange-700'
                      }
                    `}
                  >
                    {h.name}
                  </span>
                ))}
                {isOff && (
                  <div className="flex flex-col items-start gap-1">
                    <span className="hidden md:inline text-[10px] leading-tight text-emerald-600 font-medium">
                      自由休
                    </span>
                    {/* Google Calendar Quick Link Button */}
                    <button
                      onClick={(e) => handleGoogleCalendarClick(e, dateStr)}
                      title="Googleカレンダーに追加"
                      className="mt-1 md:mt-0 p-1 md:p-1.5 bg-white border border-emerald-200 rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-colors shadow-sm z-10"
                    >
                      <CalendarPlus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};