import { RefreshCw } from 'lucide-react';
import { formatSlotShort } from '../../lib/availability';

const STATUS_LABELS = {
  penuh: 'Penuh',
  diblokir: 'Klub Baca',
  lewat: 'Lewat',
  tutup: 'Tutup',
};

export default function SlotPicker({
  slotStates,
  selectedSlot,
  onSelect,
  isWeekend,
  lastUpdated,
  isReloading,
  onReload,
  error,
}) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span id="slot-picker-label" className="text-sm font-medium text-ink">
          Pilih slot waktu (durasi 2 jam)
        </span>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>Data diperbarui {lastUpdated}</span>
          <button
            type="button"
            onClick={onReload}
            aria-label="Muat ulang ketersediaan slot"
            className="inline-flex min-h-8 items-center gap-1 rounded-md border border-line bg-white px-2 text-xs font-medium text-ink transition-colors hover:border-brand/40 hover:bg-surface"
          >
            <RefreshCw
              size={12}
              aria-hidden="true"
              className={isReloading ? 'animate-spin' : ''}
            />
            Muat ulang
          </button>
        </div>
      </div>

      {isWeekend ? (
        <div className="rounded-card border border-line bg-surface p-4 text-sm text-muted">
          Ruang Diskusi tutup pada hari Sabtu dan Minggu. Silakan pilih tanggal antara Senin sampai Jumat.
        </div>
      ) : (
        <div
          id="slot-picker-group"
          role="radiogroup"
          aria-labelledby="slot-picker-label"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'err-slot' : undefined}
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
        >
          {slotStates.map(({ slot, status, reason }) => {
            const isAvailable = status === 'tersedia';
            const isSelected = selectedSlot === slot && isAvailable;
            const statusText = reason || STATUS_LABELS[status] || '';

            return (
              <button
                key={slot}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={!isAvailable}
                onClick={() => onSelect(slot)}
                className={`flex min-h-14 flex-col items-start justify-center rounded-[10px] px-3.5 py-2 text-left transition-colors ${
                  isSelected
                    ? 'border border-brand bg-brand text-white'
                    : isAvailable
                      ? 'border border-line bg-white text-ink hover:border-brand hover:bg-brand-soft/40'
                      : 'cursor-not-allowed border border-line/80 bg-surface text-muted'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    !isAvailable ? 'line-through' : ''
                  }`}
                >
                  {formatSlotShort(slot)}
                </span>
                <span
                  className={`mt-0.5 text-xs ${
                    isSelected
                      ? 'text-white/90'
                      : isAvailable
                        ? 'text-success'
                        : status === 'penuh'
                          ? 'text-danger'
                          : 'text-muted'
                  }`}
                >
                  {isSelected ? 'Dipilih' : isAvailable ? 'Tersedia' : statusText}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p id="err-slot" className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
