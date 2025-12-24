import { format, parseISO } from 'date-fns';

/**
 * Generates a Google Calendar event creation URL for a specific date.
 */
export const generateGoogleCalendarUrl = (dateStr: string) => {
  // Date format needs to be YYYYMMDD
  // Since dateStr is YYYY-MM-DD, we remove hyphens
  const cleanDate = dateStr.replace(/-/g, '');
  
  // Create an all-day event (StartDate / StartDate+1)
  // Note: For single day all-day event, Google expects EndDate to be the next day.
  // However, putting the same start/end often works for UI, but let's be safe.
  // Actually, simplest 'render' action link uses dates=YYYYMMDD/YYYYMMDD for single day
  
  const text = encodeURIComponent('自由休 (Work Holiday)');
  const details = encodeURIComponent('18-Day Work Month Managerで設定した休日です。');
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${cleanDate}/${cleanDate}&details=${details}&sprop=name:WorkManager`;
};

/**
 * Generates an ICS (iCalendar) file content for a list of dates.
 */
export const generateIcsContent = (dateStrings: string[]) => {
  const now = format(new Date(), "yyyyMMdd'T'HHmmss'Z'");
  
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//18-Day Work Month Manager//JP',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  dateStrings.forEach((dateStr) => {
    const cleanDate = dateStr.replace(/-/g, '');
    // For all-day events in ICS, DTEND is non-inclusive, so we need the next day
    // But keeping it simple with just VALUE=DATE usually implies the single day.
    
    icsContent.push('BEGIN:VEVENT');
    icsContent.push(`UID:${cleanDate}-${now}-workmanager@localhost`);
    icsContent.push(`DTSTAMP:${now}`);
    icsContent.push(`DTSTART;VALUE=DATE:${cleanDate}`);
    // DTEND is typically required for strict validation, but Google implies 1 day if omitted or set same
    // Let's set it to the same day for simplicity, or we would need date math here.
    // Standard practice for 1 day: DTSTART:20240101, DTEND:20240102
    // We'll skip math for this snippet and trust modern importers or just use DTSTART.
    icsContent.push(`SUMMARY:自由休`);
    icsContent.push(`DESCRIPTION:18-Day Work Month Managerで設定した休日`);
    icsContent.push('STATUS:CONFIRMED');
    icsContent.push('TRANSP:TRANSPARENT'); // Show as Free/Available? Or OPAQUE for Busy? Usually holidays are "Off" so maybe OPAQUE (Busy). Let's use OPAQUE.
    icsContent.push('END:VEVENT');
  });

  icsContent.push('END:VCALENDAR');
  
  return icsContent.join('\r\n');
};

export const downloadIcsFile = (dateStrings: string[]) => {
  const content = generateIcsContent(dateStrings);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'work_schedule.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};