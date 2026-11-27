import { useRef } from 'react';
import { CalendarCheck, MessageCircle } from 'lucide-react';
import { ROOM_CONFIG } from '../../config/room';
import { formatTanggalIndonesia } from '../../lib/dates';
import { formatSlotRange } from '../../lib/availability';
import Button from '../ui/Button';
import SlotPicker from './SlotPicker';
import { useBookingForm } from './useBookingForm';

export default function BookingForm() {
  const booking = useBookingForm();

  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const peopleRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = booking.validateAndSubmit();
    if (!result.ok && result.firstInvalid) {
      if (result.firstInvalid === 'name') nameRef.current?.focus();
      else if (result.firstInvalid === 'date') dateRef.current?.focus();
      else if (result.firstInvalid === 'people') peopleRef.current?.focus();
      else if (result.firstInvalid === 'slot') {
        const firstEnabledRadio = document.querySelector(
          '#slot-picker-group button:not(:disabled)'
        );
        firstEnabledRadio?.focus();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-card border border-line bg-white p-6"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="booking-nama" className="mb-1.5 block text-sm font-medium text-ink">
            Nama pemesan
          </label>
          <input
            ref={nameRef}
            id="booking-nama"
            type="text"
            autoComplete="name"
            placeholder="Nama lengkap pemesan"
            value={booking.name}
            onChange={(event) => booking.setName(event.target.value)}
            aria-invalid={booking.errors.name ? 'true' : 'false'}
            aria-describedby={booking.errors.name ? 'err-nama' : undefined}
            className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink placeholder:text-muted transition-colors ${
              booking.errors.name ? 'border-danger' : 'border-field-border focus:border-brand'
            }`}
          />
          {booking.errors.name && (
            <p id="err-nama" className="mt-1.5 text-xs font-medium text-danger">
              {booking.errors.name}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-tanggal" className="mb-1.5 block text-sm font-medium text-ink">
              Tanggal (Senin - Jumat)
            </label>
            <input
              ref={dateRef}
              id="booking-tanggal"
              type="date"
              min={booking.todayISO}
              max={booking.maxDateISO}
              value={booking.date}
              onChange={(event) => booking.handleDateChange(event.target.value)}
              aria-invalid={booking.errors.date ? 'true' : 'false'}
              aria-describedby={booking.errors.date ? 'err-tanggal' : undefined}
              className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink transition-colors ${
                booking.errors.date ? 'border-danger' : 'border-field-border focus:border-brand'
              }`}
            />
            {booking.errors.date && (
              <p id="err-tanggal" className="mt-1.5 text-xs font-medium text-danger">
                {booking.errors.date}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="booking-orang" className="mb-1.5 block text-sm font-medium text-ink">
              Jumlah orang ({ROOM_CONFIG.minPeople} - {ROOM_CONFIG.maxPeople})
            </label>
            <input
              ref={peopleRef}
              id="booking-orang"
              type="number"
              min={ROOM_CONFIG.minPeople}
              max={ROOM_CONFIG.maxPeople}
              value={booking.people}
              onChange={(event) => booking.setPeople(event.target.value)}
              aria-invalid={booking.errors.people ? 'true' : 'false'}
              aria-describedby={booking.errors.people ? 'err-orang' : undefined}
              className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink transition-colors ${
                booking.errors.people ? 'border-danger' : 'border-field-border focus:border-brand'
              }`}
            />
            {booking.errors.people && (
              <p id="err-orang" className="mt-1.5 text-xs font-medium text-danger">
                {booking.errors.people}
              </p>
            )}
          </div>
        </div>

        <SlotPicker
          slotStates={booking.slotStates}
          selectedSlot={booking.slot}
          onSelect={booking.handleSlotChange}
          isWeekend={booking.isWeekend}
          lastUpdated={booking.lastUpdated}
          isReloading={booking.isReloading}
          onReload={booking.reloadSlots}
          error={booking.errors.slot}
        />

        {booking.date && booking.slot && !booking.isWeekend && (
          <div className="rounded-card border border-brand/20 bg-brand-soft/60 p-4 text-sm">
            <div className="flex items-center gap-2 font-medium text-brand">
              <CalendarCheck size={16} aria-hidden="true" />
              Ringkasan Booking
            </div>
            <dl className="mt-2.5 grid gap-1 text-sm text-ink sm:grid-cols-3">
              <div>
                <dt className="text-xs text-muted">Tanggal</dt>
                <dd className="font-medium">{formatTanggalIndonesia(booking.date)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Jam</dt>
                <dd className="font-medium">{formatSlotRange(booking.slot)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Peserta</dt>
                <dd className="font-medium">{booking.people || '-'} orang</dd>
              </div>
            </dl>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            Booking dikonfirmasi setelah pengelola membalas pesan WhatsApp.
          </p>
          <Button
            type="submit"
            variant="primary"
            disabled={!booking.whatsappReady}
            className="w-full sm:w-auto"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Booking via WhatsApp
          </Button>
        </div>

        {booking.statusMessage && (
          <p
            role="status"
            className="rounded-[10px] border border-success/20 bg-success-soft px-4 py-3 text-sm text-success"
          >
            {booking.statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}
