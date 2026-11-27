import { useMemo, useState } from 'react';
import {
  addDaysISO,
  formatTanggalIndonesia,
  getDaysDifference,
  getJakartaNow,
} from '../../lib/dates';

export default function DueDateCalculator() {
  const todayISO = useMemo(() => getJakartaNow().dateISO, []);
  const [borrowedDate, setBorrowedDate] = useState(todayISO);

  const calculation = useMemo(() => {
    if (!borrowedDate) return null;
    if (borrowedDate > todayISO) {
      return { error: 'Tanggal pinjam tidak boleh melebihi hari ini.' };
    }

    const dueDate = addDaysISO(borrowedDate, 14);
    const extendedDate = addDaysISO(borrowedDate, 28);
    const remainingDays = getDaysDifference(dueDate, todayISO);

    let statusText = '';
    let statusTone = 'success';

    if (remainingDays > 0) {
      statusText = `Sisa ${remainingDays} hari lagi`;
      statusTone = remainingDays <= 3 ? 'accent' : 'success';
    } else if (remainingDays === 0) {
      statusText = 'Jatuh tempo hari ini';
      statusTone = 'accent';
    } else {
      const lateDays = Math.abs(remainingDays);
      statusText = `Terlambat ${lateDays} hari (denda Rp${(lateDays * 1000).toLocaleString('id-ID')}/buku)`;
      statusTone = 'danger';
    }

    return {
      dueDate,
      extendedDate,
      statusText,
      statusTone,
    };
  }, [borrowedDate, todayISO]);

  return (
    <aside
      aria-labelledby="kalkulator-heading"
      className="flex h-full flex-col justify-between rounded-card border border-line bg-surface p-6"
    >
      <div>
        <div>
          <h3
            id="kalkulator-heading"
            className="font-heading text-xl font-semibold tracking-tight text-ink"
          >
            Kalkulator Jatuh Tempo
          </h3>
          <p className="mt-1 text-xs text-muted">
            Masa pinjam 14 hari, perpanjangan 1x (+14 hari)
          </p>
        </div>

        <div className="mt-5">
          <label
            htmlFor="tanggal-pinjam"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Tanggal pinjam buku
          </label>
          <input
            id="tanggal-pinjam"
            type="date"
            max={todayISO}
            value={borrowedDate}
            onChange={(event) => setBorrowedDate(event.target.value)}
            className="h-11 w-full rounded-lg border border-field-border bg-white px-3.5 text-sm text-ink transition-colors focus:border-brand"
          />
        </div>

        <div className="mt-5" aria-live="polite">
          {!calculation && (
            <div className="rounded-card border border-dashed border-field-border bg-white p-4 text-sm text-muted">
              Pilih tanggal pinjam untuk melihat batas pengembalian dan sisa hari.
            </div>
          )}

          {calculation?.error && (
            <div className="rounded-card border border-danger/25 bg-danger-soft p-4 text-sm text-danger">
              {calculation.error}
            </div>
          )}

          {calculation && !calculation.error && (
            <div className="grid gap-3 rounded-card border border-line bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                <span className="text-xs font-medium text-muted">Status saat ini</span>
                <span
                  className={`rounded-md px-2.5 py-0.5 text-xs font-medium ${
                    calculation.statusTone === 'danger'
                      ? 'bg-danger-soft text-danger'
                      : calculation.statusTone === 'accent'
                        ? 'bg-accent-soft text-accent'
                        : 'bg-success-soft text-success'
                  }`}
                >
                  {calculation.statusText}
                </span>
              </div>

              <div>
                <p className="text-xs text-muted">Tanggal jatuh tempo (+14 hari)</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  {formatTanggalIndonesia(calculation.dueDate)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted">Maksimal setelah perpanjangan 1x (+28 hari)</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">
                  {formatTanggalIndonesia(calculation.extendedDate)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
        Perpanjangan dapat diajukan sebelum jatuh tempo di meja pengurus. Denda keterlambatan Rp1.000 per hari per buku.
      </p>
    </aside>
  );
}
