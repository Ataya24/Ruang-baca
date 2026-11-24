import { getDay, parseISO } from 'date-fns';
import { ROOM_CONFIG } from '../config/room.js';
import { getJakartaNow } from './dates.js';

/**
 * Format slot mulai "14:00" dengan durasi 2 jam -> "14.00 - 16.00 WIB"
 */
export function formatSlotRange(slot, durationHours = ROOM_CONFIG.durationHours) {
  const [hourStr, minStr] = slot.split(':');
  const startHour = Number(hourStr);
  const endHour = startHour + durationHours;
  return `${String(startHour).padStart(2, '0')}.${minStr} - ${String(endHour).padStart(2, '0')}.${minStr} WIB`;
}

/**
 * Format ringkas untuk chip: "14.00 - 16.00"
 */
export function formatSlotShort(slot, durationHours = ROOM_CONFIG.durationHours) {
  const [hourStr, minStr] = slot.split(':');
  const startHour = Number(hourStr);
  const endHour = startHour + durationHours;
  return `${String(startHour).padStart(2, '0')}.${minStr} - ${String(endHour).padStart(2, '0')}.${minStr}`;
}

/**
 * Menghitung status ketersediaan slot pada tanggal tertentu menggunakan waktu WIB.
 * Return: { status: 'tersedia' | 'penuh' | 'diblokir' | 'lewat' | 'tutup', reason?: string }
 */
export function getSlotStatus(dateISO, slot, bookings, referenceDate = new Date()) {
  if (!dateISO) return { status: 'tutup', reason: 'Pilih tanggal' };

  const date = parseISO(dateISO);
  const weekday = getDay(date);

  if (!ROOM_CONFIG.openDays.includes(weekday)) {
    return { status: 'tutup', reason: 'Tutup' };
  }

  const block = ROOM_CONFIG.blocked.find(
    (item) => item.weekday === weekday && item.slot === slot
  );
  if (block) {
    return { status: 'diblokir', reason: block.reason };
  }

  const now = getJakartaNow(referenceDate);
  if (dateISO < now.dateISO) {
    return { status: 'lewat', reason: 'Lewat' };
  }

  if (dateISO === now.dateISO) {
    const [slotHour, slotMin] = slot.split(':').map(Number);
    const slotMinutes = slotHour * 60 + slotMin;
    if (slotMinutes <= now.totalMinutes) {
      return { status: 'lewat', reason: 'Lewat' };
    }
  }

  const taken = bookings.some((b) => b.tanggal === dateISO && b.slot === slot);
  if (taken) {
    return { status: 'penuh', reason: 'Penuh' };
  }

  return { status: 'tersedia' };
}
