export const ROOM_CONFIG = {
  slots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
  durationHours: 2,
  minPeople: 4,
  maxPeople: 8,
  openDays: [1, 2, 3, 4, 5], // Senin=1 ... Jumat=5
  openHour: 8,
  closeHour: 20,
  maxAdvanceDays: 30,
  whatsappNumber: '6280000000000', // Ganti dengan nomor resmi pengelola
  blocked: [
    { weekday: 5, slot: '16:00', reason: 'Klub Baca' },
  ],
};
