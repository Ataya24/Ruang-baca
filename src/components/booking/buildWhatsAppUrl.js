import { ROOM_CONFIG } from '../../config/room';
import { formatTanggalIndonesia } from '../../lib/dates';
import { formatSlotRange } from '../../lib/availability';

export function isWhatsAppConfigured() {
  return (
    Boolean(ROOM_CONFIG.whatsappNumber) &&
    /^\d{10,15}$/.test(ROOM_CONFIG.whatsappNumber)
  );
}

export function buildWhatsAppUrl({ name, date, slot, people }) {
  if (!isWhatsAppConfigured()) {
    if (import.meta.env.DEV) {
      console.error(
        'Nomor WhatsApp pengelola belum terkonfigurasi dengan benar di src/config/room.js'
      );
    }
    return null;
  }

  const lines = [
    'Halo, saya ingin booking Ruang Diskusi.',
    `Nama: ${name.trim()}`,
    `Tanggal: ${formatTanggalIndonesia(date)}`,
    `Jam: ${formatSlotRange(slot)}`,
    `Jumlah orang: ${people}`,
  ];

  return `https://wa.me/${ROOM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lines.join('\n')
  )}`;
}
