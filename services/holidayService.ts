import { Holiday } from '../types';

// Hardcoded holidays for 2024-2026
// In a real app, this might come from an API or a more comprehensive library
const HOLIDAYS: Holiday[] = [
  // --- JAPAN (JP) 2024 ---
  { date: '2024-01-01', name: '元日', country: 'JP' },
  { date: '2024-01-08', name: '成人の日', country: 'JP' },
  { date: '2024-02-11', name: '建国記念の日', country: 'JP' },
  { date: '2024-02-12', name: '振替休日', country: 'JP' },
  { date: '2024-02-23', name: '天皇誕生日', country: 'JP' },
  { date: '2024-03-20', name: '春分の日', country: 'JP' },
  { date: '2024-04-29', name: '昭和の日', country: 'JP' },
  { date: '2024-05-03', name: '憲法記念日', country: 'JP' },
  { date: '2024-05-04', name: 'みどりの日', country: 'JP' },
  { date: '2024-05-05', name: 'こどもの日', country: 'JP' },
  { date: '2024-05-06', name: '振替休日', country: 'JP' },
  { date: '2024-07-15', name: '海の日', country: 'JP' },
  { date: '2024-08-11', name: '山の日', country: 'JP' },
  { date: '2024-08-12', name: '振替休日', country: 'JP' },
  { date: '2024-09-16', name: '敬老の日', country: 'JP' },
  { date: '2024-09-22', name: '秋分の日', country: 'JP' },
  { date: '2024-09-23', name: '振替休日', country: 'JP' },
  { date: '2024-10-14', name: 'スポーツの日', country: 'JP' },
  { date: '2024-11-03', name: '文化の日', country: 'JP' },
  { date: '2024-11-04', name: '振替休日', country: 'JP' },
  { date: '2024-11-23', name: '勤労感謝の日', country: 'JP' },

  // --- JAPAN (JP) 2025 ---
  { date: '2025-01-01', name: '元日', country: 'JP' },
  { date: '2025-01-13', name: '成人の日', country: 'JP' },
  { date: '2025-02-11', name: '建国記念の日', country: 'JP' },
  { date: '2025-02-23', name: '天皇誕生日', country: 'JP' },
  { date: '2025-02-24', name: '振替休日', country: 'JP' },
  { date: '2025-03-20', name: '春分の日', country: 'JP' },
  { date: '2025-04-29', name: '昭和の日', country: 'JP' },
  { date: '2025-05-03', name: '憲法記念日', country: 'JP' },
  { date: '2025-05-04', name: 'みどりの日', country: 'JP' },
  { date: '2025-05-05', name: 'こどもの日', country: 'JP' },
  { date: '2025-05-06', name: '振替休日', country: 'JP' },
  { date: '2025-07-21', name: '海の日', country: 'JP' },
  { date: '2025-08-11', name: '山の日', country: 'JP' },
  { date: '2025-09-15', name: '敬老の日', country: 'JP' },
  { date: '2025-09-23', name: '秋分の日', country: 'JP' },
  { date: '2025-10-13', name: 'スポーツの日', country: 'JP' },
  { date: '2025-11-03', name: '文化の日', country: 'JP' },
  { date: '2025-11-23', name: '勤労感謝の日', country: 'JP' },
  { date: '2025-11-24', name: '振替休日', country: 'JP' },

  // --- JAPAN (JP) 2026 ---
  { date: '2026-01-01', name: '元日', country: 'JP' },
  { date: '2026-01-12', name: '成人の日', country: 'JP' },
  { date: '2026-02-11', name: '建国記念の日', country: 'JP' },
  { date: '2026-02-23', name: '天皇誕生日', country: 'JP' },
  { date: '2026-03-20', name: '春分の日', country: 'JP' },
  { date: '2026-04-29', name: '昭和の日', country: 'JP' },
  { date: '2026-05-03', name: '憲法記念日', country: 'JP' },
  { date: '2026-05-04', name: 'みどりの日', country: 'JP' },
  { date: '2026-05-05', name: 'こどもの日', country: 'JP' },
  { date: '2026-05-06', name: '振替休日', country: 'JP' },
  { date: '2026-07-20', name: '海の日', country: 'JP' },
  { date: '2026-08-11', name: '山の日', country: 'JP' },
  { date: '2026-09-21', name: '敬老の日', country: 'JP' },
  { date: '2026-09-22', name: '国民の休日', country: 'JP' },
  { date: '2026-09-23', name: '秋分の日', country: 'JP' },
  { date: '2026-10-12', name: 'スポーツの日', country: 'JP' },
  { date: '2026-11-03', name: '文化の日', country: 'JP' },
  { date: '2026-11-23', name: '勤労感謝の日', country: 'JP' },

  // --- TAIWAN (TW) 2024 ---
  { date: '2024-01-01', name: '元旦', country: 'TW' },
  { date: '2024-02-08', name: '春節連休', country: 'TW' },
  { date: '2024-02-09', name: '除夕', country: 'TW' },
  { date: '2024-02-10', name: '春節', country: 'TW' },
  { date: '2024-02-11', name: '春節', country: 'TW' },
  { date: '2024-02-12', name: '春節', country: 'TW' },
  { date: '2024-02-13', name: '春節', country: 'TW' },
  { date: '2024-02-14', name: '春節', country: 'TW' },
  { date: '2024-02-28', name: '和平記念日', country: 'TW' },
  { date: '2024-04-04', name: '児童節', country: 'TW' },
  { date: '2024-04-05', name: '清明節', country: 'TW' },
  { date: '2024-05-01', name: '労働節', country: 'TW' },
  { date: '2024-06-10', name: '端午節', country: 'TW' },
  { date: '2024-09-17', name: '中秋節', country: 'TW' },
  { date: '2024-10-10', name: '国慶日', country: 'TW' },

  // --- TAIWAN (TW) 2025 ---
  { date: '2025-01-01', name: '元旦', country: 'TW' },
  { date: '2025-01-25', name: '春節連休', country: 'TW' },
  { date: '2025-01-26', name: '春節連休', country: 'TW' },
  { date: '2025-01-27', name: '春節連休', country: 'TW' },
  { date: '2025-01-28', name: '除夕', country: 'TW' },
  { date: '2025-01-29', name: '春節', country: 'TW' },
  { date: '2025-01-30', name: '春節', country: 'TW' },
  { date: '2025-01-31', name: '春節', country: 'TW' },
  { date: '2025-02-01', name: '春節', country: 'TW' },
  { date: '2025-02-02', name: '春節', country: 'TW' },
  { date: '2025-02-28', name: '和平記念日', country: 'TW' },
  { date: '2025-04-03', name: '児童節', country: 'TW' },
  { date: '2025-04-04', name: '清明節', country: 'TW' },
  { date: '2025-05-01', name: '労働節', country: 'TW' },
  { date: '2025-05-31', name: '端午節', country: 'TW' },
  { date: '2025-10-06', name: '中秋節', country: 'TW' },
  { date: '2025-10-10', name: '国慶日', country: 'TW' },

  // --- TAIWAN (TW) 2026 ---
  { date: '2026-01-01', name: '元旦', country: 'TW' },
  { date: '2026-02-16', name: '除夕', country: 'TW' },
  { date: '2026-02-17', name: '春節', country: 'TW' },
  { date: '2026-02-18', name: '春節', country: 'TW' },
  { date: '2026-02-19', name: '春節', country: 'TW' },
  { date: '2026-02-20', name: '春節', country: 'TW' },
  { date: '2026-02-28', name: '和平記念日', country: 'TW' },
  { date: '2026-04-03', name: '児童節', country: 'TW' },
  { date: '2026-04-06', name: '清明節', country: 'TW' },
  { date: '2026-05-01', name: '労働節', country: 'TW' },
  { date: '2026-06-19', name: '端午節', country: 'TW' },
  { date: '2026-09-25', name: '中秋節', country: 'TW' },
  { date: '2026-10-09', name: '国慶日', country: 'TW' },
];

/**
 * Returns all holidays for a given date string.
 */
export const getHolidays = (dateStr: string): Holiday[] => {
  return HOLIDAYS.filter(h => h.date === dateStr);
};

/**
 * Returns a single formatted name if simpler display is needed (legacy support mostly).
 * If multiple holidays, joins them.
 */
export const getHolidayName = (dateStr: string): string | undefined => {
  const holidays = getHolidays(dateStr);
  if (holidays.length === 0) return undefined;
  return holidays.map(h => h.name).join(' / ');
};

export const isHoliday = (dateStr: string): boolean => {
  return HOLIDAYS.some(h => h.date === dateStr);
};
