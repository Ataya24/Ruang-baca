import { formatTanggalPendek } from '../../lib/dates';

export default function BookStatus({
  status,
  tanggalKembali = null,
  showReturnDate = false,
}) {
  const isAvailable = status === 'tersedia';

  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
          isAvailable ? 'text-success' : 'text-danger'
        }`}
      >
        <span
          aria-hidden="true"
          className={`size-2 shrink-0 rounded-full ${
            isAvailable ? 'bg-success' : 'bg-danger'
          }`}
        />
        {isAvailable ? 'Tersedia' : 'Dipinjam'}
      </span>

      {showReturnDate && !isAvailable && tanggalKembali && (
        <span className="text-xs text-muted">
          Perkiraan kembali: <strong className="font-medium text-ink">{formatTanggalPendek(tanggalKembali)}</strong>
        </span>
      )}
    </div>
  );
}
