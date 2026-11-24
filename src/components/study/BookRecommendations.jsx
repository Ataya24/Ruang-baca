import { useEffect, useState } from 'react';
import { Clock, Library, RefreshCw } from 'lucide-react';
import Chip from '../ui/Chip';

const CATEGORIES = [
  { id: 'semua', label: 'Semua' },
  { id: 'kuliah', label: 'Kuliah' },
  { id: 'novel', label: 'Novel' },
  { id: 'jurnal', label: 'Jurnal' },
];

export default function BookRecommendations() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('semua');
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecommendations() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/data/rekomendasi-baca.json', {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil data rekomendasi bacaan.');
        }

        const data = await response.json();
        const filtered =
          category === 'semua'
            ? data
            : data.filter((item) => item.kategori === category);
        setItems(filtered);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Terjadi kesalahan saat memuat data.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRecommendations();

    return () => controller.abort();
  }, [category, reloadKey]);

  return (
    <article className="rounded-card border border-line bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
            <Library size={20} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold tracking-tight text-ink">
              Rekomendasi Bacaan Minggu Ini
            </h3>
            <p className="text-xs text-muted">
              Data dimuat otomatis menggunakan useEffect dari berkas JSON
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setReloadKey((prev) => prev + 1)}
          aria-label="Muat ulang rekomendasi bacaan"
          className="inline-flex min-h-10 items-center gap-1.5 self-start rounded-lg border border-line bg-white px-3 text-xs font-medium text-ink transition-colors hover:border-brand/40 hover:bg-surface sm:self-auto"
        >
          <RefreshCw
            size={14}
            aria-hidden="true"
            className={loading ? 'animate-spin' : ''}
          />
          Muat ulang
        </button>
      </div>

      <div
        className="mt-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter rekomendasi bacaan"
      >
        {CATEGORIES.map((item) => (
          <Chip
            key={item.id}
            active={category === item.id}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </Chip>
        ))}
      </div>

      <div className="mt-5" aria-live="polite">
        {loading && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="h-28 rounded-card border border-line bg-surface p-4"
              >
                <div className="h-4 w-2/3 rounded bg-line" />
                <div className="mt-3 h-3 w-full rounded bg-line" />
                <div className="mt-2 h-3 w-4/5 rounded bg-line" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-card border border-danger/20 bg-danger-soft p-4 text-sm text-danger">
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="rounded-card border border-dashed border-line bg-surface p-6 text-center text-sm text-muted">
            Belum ada rekomendasi untuk kategori ini.
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col justify-between rounded-card border border-line bg-surface p-4"
              >
                <div>
                  <span className="inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
                    {item.kategori}
                  </span>
                  <h4 className="mt-2 font-heading text-sm font-semibold text-ink">
                    {item.judul}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {item.alasan}
                  </p>
                </div>

                <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted">
                  <Clock size={13} aria-hidden="true" />
                  Estimasi {item.estimasiMenit} menit
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
