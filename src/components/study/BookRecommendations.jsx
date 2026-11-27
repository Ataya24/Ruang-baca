import { useEffect, useState } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { books } from '../../data/books';
import Button from '../ui/Button';
import Chip from '../ui/Chip';

const CATEGORIES = [
  { id: 'semua', label: 'Semua' },
  { id: 'kuliah', label: 'Kuliah' },
  { id: 'novel', label: 'Novel' },
  { id: 'jurnal', label: 'Jurnal' },
];

const CATEGORY_LABELS = {
  kuliah: 'Kuliah',
  novel: 'Novel',
  jurnal: 'Jurnal',
};

const BOOK_ID_BY_TITLE = new Map(
  books.map((book) => [book.judul.toLowerCase(), book.id])
);

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
        <div>
          <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
            Rekomendasi Bacaan Minggu Ini
          </h3>
          <p className="mt-1 text-xs text-muted">
            Pilihan bacaan kurasi pengurus untuk menemani sesi belajarmu.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setReloadKey((prev) => prev + 1)}
          aria-label="Muat ulang rekomendasi bacaan"
          className="inline-flex min-h-11 items-center gap-1.5 self-start rounded-lg border border-field-border bg-white px-3 text-xs font-medium text-ink transition-colors hover:border-brand hover:bg-paper sm:min-h-10 sm:self-auto"
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
          <div>
            <p className="sr-only">Memuat rekomendasi bacaan...</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((skeleton) => (
                <div
                  key={skeleton}
                  className="h-28 rounded-card border border-line bg-paper p-4"
                >
                  <div className="h-4 w-2/3 rounded bg-line" />
                  <div className="mt-3 h-3 w-full rounded bg-line" />
                  <div className="mt-2 h-3 w-4/5 rounded bg-line" />
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-start justify-between gap-3 rounded-card border border-danger/25 bg-danger-soft p-4 text-sm text-danger sm:flex-row sm:items-center">
            <p>{error}</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setReloadKey((prev) => prev + 1)}
            >
              Coba lagi
            </Button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="rounded-card border border-dashed border-field-border bg-paper p-6 text-center text-sm text-muted">
            <p>Belum ada rekomendasi untuk kategori ini.</p>
            {category !== 'semua' && (
              <div className="mt-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCategory('semua')}
                >
                  Tampilkan semua kategori
                </Button>
              </div>
            )}
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const matchedBookId = BOOK_ID_BY_TITLE.get(
                item.judul.toLowerCase()
              );

              return (
                <li
                  key={item.id}
                  className="flex flex-col justify-between rounded-card border border-line bg-paper p-4"
                >
                  <div>
                    <span className="inline-block rounded-md bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
                      {CATEGORY_LABELS[item.kategori] ?? item.kategori}
                    </span>
                    <h4 className="mt-2 font-heading text-base font-semibold text-ink">
                      {matchedBookId ? (
                        <a
                          href={`#buku-${matchedBookId}`}
                          className="transition-colors hover:text-brand hover:underline"
                        >
                          {item.judul}
                        </a>
                      ) : (
                        item.judul
                      )}
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
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
}
