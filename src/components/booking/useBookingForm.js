import { useCallback, useEffect, useMemo, useState } from 'react';
import { getDay, parseISO } from 'date-fns';
import { ROOM_CONFIG } from '../../config/room';
import { initialBookings } from '../../data/bookings';
import { addDaysISO, getJakartaNow, getNextOpenDateISO } from '../../lib/dates';
import { getSlotStatus } from '../../lib/availability';
import { buildWhatsAppUrl, isWhatsAppConfigured } from './buildWhatsAppUrl';

export function useBookingForm() {
  const [now, setNow] = useState(() => new Date());
  const jakartaNow = useMemo(() => getJakartaNow(now), [now]);
  const todayISO = jakartaNow.dateISO;
  const maxDateISO = useMemo(
    () => addDaysISO(todayISO, ROOM_CONFIG.maxAdvanceDays),
    [todayISO]
  );

  const [bookings] = useState(initialBookings);
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => getNextOpenDateISO(todayISO));
  const [slot, setSlot] = useState('');
  const [people, setPeople] = useState('4');
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isReloading, setIsReloading] = useState(false);

  // Perbarui waktu WIB tiap menit dan saat tab kembali aktif (antisipasi lewat tengah malam)
  useEffect(() => {
    const refresh = () => setNow(new Date());
    const interval = window.setInterval(refresh, 60_000);
    window.addEventListener('focus', refresh);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  const slotStates = useMemo(() => {
    return ROOM_CONFIG.slots.map((slotTime) => ({
      slot: slotTime,
      ...getSlotStatus(date, slotTime, bookings, now),
    }));
  }, [date, bookings, now]);

  const isWeekend = useMemo(() => {
    if (!date) return false;
    const weekday = getDay(parseISO(date));
    return !ROOM_CONFIG.openDays.includes(weekday);
  }, [date]);

  const handleDateChange = useCallback(
    (nextDate) => {
      setDate(nextDate);
      setStatusMessage('');
      setErrors((prev) => ({ ...prev, date: undefined }));

      if (slot) {
        const nextStatus = getSlotStatus(nextDate, slot, bookings, now);
        if (nextStatus.status !== 'tersedia') {
          setSlot('');
        }
      }
    },
    [slot, bookings, now]
  );

  const handleSlotChange = useCallback((nextSlot) => {
    setSlot(nextSlot);
    setStatusMessage('');
    setErrors((prev) => ({ ...prev, slot: undefined }));
  }, []);

  const reloadSlots = useCallback(() => {
    setIsReloading(true);
    window.setTimeout(() => {
      const freshNow = new Date();
      setNow(freshNow);
      setIsReloading(false);
    }, 250);
  }, []);

  const validateAndSubmit = useCallback(() => {
    const nextErrors = {};
    const trimmedName = name.trim();

    if (trimmedName.length < 3) {
      nextErrors.name = 'Nama wajib diisi (minimal 3 karakter).';
    }

    if (!date) {
      nextErrors.date = 'Tanggal booking wajib dipilih.';
    } else if (date < todayISO) {
      nextErrors.date = 'Tanggal tidak boleh sebelum hari ini.';
    } else if (date > maxDateISO) {
      nextErrors.date = `Maksimal booking ${ROOM_CONFIG.maxAdvanceDays} hari ke depan.`;
    } else if (!ROOM_CONFIG.openDays.includes(getDay(parseISO(date)))) {
      nextErrors.date = 'Ruang Diskusi tutup pada Sabtu dan Minggu. Pilih Senin sampai Jumat.';
    }

    if (!slot) {
      nextErrors.slot = 'Pilih salah satu slot waktu yang tersedia.';
    } else {
      const currentStatus = getSlotStatus(date, slot, bookings, now);
      if (currentStatus.status !== 'tersedia') {
        nextErrors.slot = 'Slot yang dipilih sudah tidak tersedia. Silakan pilih slot lain.';
      }
    }

    const numPeople = Number(people);
    if (
      !Number.isInteger(numPeople) ||
      numPeople < ROOM_CONFIG.minPeople ||
      numPeople > ROOM_CONFIG.maxPeople
    ) {
      nextErrors.people = `Jumlah orang harus antara ${ROOM_CONFIG.minPeople} sampai ${ROOM_CONFIG.maxPeople}.`;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage('');
      const firstFieldOrder = ['name', 'date', 'slot', 'people'];
      const firstInvalid = firstFieldOrder.find((key) => nextErrors[key]);
      return { ok: false, firstInvalid };
    }

    const waUrl = buildWhatsAppUrl({
      name: trimmedName,
      date,
      slot,
      people: numPeople,
    });

    if (!waUrl) {
      setStatusMessage('Nomor WhatsApp pengelola belum terkonfigurasi.');
      return { ok: false, firstInvalid: null };
    }

    setStatusMessage(
      'Ringkasan booking siap dikirim via WhatsApp. Booking dikonfirmasi setelah pengelola membalas.'
    );
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    return { ok: true, firstInvalid: null };
  }, [name, date, slot, people, todayISO, maxDateISO, bookings, now]);

  return {
    name,
    setName: (val) => {
      setName(val);
      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
    },
    date,
    handleDateChange,
    slot,
    handleSlotChange,
    people,
    setPeople: (val) => {
      setPeople(val);
      if (errors.people) setErrors((prev) => ({ ...prev, people: undefined }));
    },
    errors,
    statusMessage,
    slotStates,
    isWeekend,
    todayISO,
    maxDateISO,
    lastUpdated: jakartaNow.timeLabel,
    isReloading,
    reloadSlots,
    validateAndSubmit,
    whatsappReady: isWhatsAppConfigured(),
  };
}
