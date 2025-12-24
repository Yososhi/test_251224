
export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  country: 'JP' | 'TW';
}

export interface DayStats {
  totalDays: number;
  totalWeekdays: number;
  requiredWorkDays: number;
  freeDaysAllowance: number;
  daysTakenOff: number;
  remainingFreeDays: number;
}

export enum DayType {
  Weekday = 'weekday',
  Saturday = 'saturday',
  Sunday = 'sunday',
  HolidayJP = 'holiday_jp',
  HolidayTW = 'holiday_tw',
  HolidayBoth = 'holiday_both',
}
