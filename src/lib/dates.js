import { addDays, differenceInCalendarDays, format, getDay, parseISO } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { ROOM_CONFIG } from '../config/room.js';

const WEEKDAY_MAP = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/**
 * Ambil waktu saat ini di zona waktu WIB (Asia/Jakarta),
 * independen dari zona waktu perangkat pengguna.
 */
export function getJakartaNow(referenceDate = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(referenceDate);

  const get = (type) => parts.find((p) => p.type === type)?.value ?? '';
  const year = get('year');
  const month = get('month');
  const day = get('day');
  const hour = Number(get('hour'));
  const minute = Number(get('minute'));
  const weekday = WEEKDAY_MAP[get('weekday')] ?? 0;

  return {
    dateISO: `${year}-${month}-${day}`,
    hour,
    minute,
    totalMinutes: hour * 60 + minute,
    weekday,
    timeLabel: `${String(hour).padStart(2, '0')}.${String(minute).padStart(2, '0')} WIB`,
  };
}

export function isLibraryOpenWIB(referenceDate = new Date()) {
  const now = getJakartaNow(referenceDate);
  const openStart = ROOM_CONFIG.openHour * 60;
  const openEnd = ROOM_CONFIG.closeHour * 60;
  return (
    ROOM_CONFIG.openDays.includes(now.weekday) &&
    now.totalMinutes >= openStart &&
    now.totalMinutes < openEnd
  );
}

export function formatTanggalIndonesia(dateISO) {
  if (!dateISO) return '';
  return format(parseISO(dateISO), 'EEEE, d MMMM yyyy', { locale: idLocale });
}

export function formatTanggalPendek(dateISO) {
  if (!dateISO) return '';
  return format(parseISO(dateISO), 'd MMM yyyy', { locale: idLocale });
}

export function addDaysISO(dateISO, days) {
  return format(addDays(parseISO(dateISO), days), 'yyyy-MM-dd');
}

export function getDaysDifference(targetISO, baseISO) {
  return differenceInCalendarDays(parseISO(targetISO), parseISO(baseISO));
}

export function getNextOpenDateISO(fromISO) {
  let cursor = parseISO(fromISO);
  while (!ROOM_CONFIG.openDays.includes(getDay(cursor))) {
    cursor = addDays(cursor, 1);
  }
  return format(cursor, 'yyyy-MM-dd');
}

export function getUpcomingFridays(count, referenceDate = new Date()) {
  const now = getJakartaNow(referenceDate);
  const todayDate = parseISO(now.dateISO);
  let daysUntilFriday = (5 - now.weekday + 7) % 7;
  if (daysUntilFriday === 0 && now.hour >= 16) {
    daysUntilFriday = 7;
  }
  const firstFriday = addDays(todayDate, daysUntilFriday);
  return Array.from({ length: count }, (_, index) => {
    const date = addDays(firstFriday, index * 7);
    return {
      dateISO: format(date, 'yyyy-MM-dd'),
      dayNumber: format(date, 'd'),
      monthShort: format(date, 'MMM', { locale: idLocale }),
      weekdayLabel: format(date, 'EEEE', { locale: idLocale }),
      fullLabel: format(date, 'EEEE, d MMMM yyyy', { locale: idLocale }),
    };
  });
}
