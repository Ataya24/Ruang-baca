import { useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

const DAILY_TARGET = 30;

export default function ReadingCounter() {
  const [pages, setPages] = useState(0);

  const progress = Math.min(100, Math.round((pages / DAILY_TARGET) * 100));

  function handleDecrease() {
    setPages((prev) => Math.max(0, prev - 1));
  }

  function handleIncrease(amount = 1) {
    setPages((prev) => prev + amount);
  }

  function handleReset() {
    setPages(0);
  }

  return (
    <article className="flex h-full flex-col justify-between rounded-card border border-line bg-white p-6">
      <div>
        <div>
          <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
            Penghitung Halaman
          </h3>
          <p className="mt-1 text-xs text-muted">
            Catat jumlah halaman yang dibaca hari ini
          </p>
        </div>

        <div className="mt-5 rounded-card border border-line bg-paper p-5 text-center">
          <p className="text-xs font-medium text-muted">Halaman dibaca</p>
          <p
            aria-live="polite"
            className="mt-1 font-heading text-5xl font-semibold tracking-tight text-ink"
          >
            {pages}
          </p>
          <p className="mt-1 text-xs text-muted">
            Target harian: {DAILY_TARGET} halaman ({progress}%)
          </p>

          <div
            role="progressbar"
            aria-label="Progres target baca harian"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line"
          >
            <div
              className="h-full rounded-full bg-brand transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {pages >= DAILY_TARGET && (
          <p
            role="status"
            className="mt-3 rounded-lg border border-success/25 bg-success-soft px-3.5 py-2 text-xs font-medium text-success"
          >
            Target baca harian {DAILY_TARGET} halaman tercapai.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDecrease}
          disabled={pages === 0}
          aria-label="Kurangi 1 halaman"
        >
          <Minus size={15} aria-hidden="true" />
          1
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleIncrease(1)}
          aria-label="Tambah 1 halaman"
        >
          <Plus size={15} aria-hidden="true" />
          1 halaman
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleIncrease(5)}
          aria-label="Tambah 5 halaman"
        >
          +5
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          disabled={pages === 0}
          aria-label="Reset penghitung halaman"
          className="ml-auto"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reset
        </Button>
      </div>
    </article>
  );
}
