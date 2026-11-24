import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { BOOK_CATEGORIES, books } from '../../data/books';
import Section from '../layout/Section';
import Chip from '../ui/Chip';
import Button from '../ui/Button';
import BookCard from './BookCard';
import BookModal from './BookModal';
import { useBookModal } from './useBookModal';

export default function CatalogSection() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('semua');

  const filteredBooks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchCategory = category === 'semua' || book.kategori === category;
      const matchQuery =
        !normalized ||
        book.judul.toLowerCase().includes(normalized) ||
        book.penulis.toLowerCase().includes(normalized) ||
        book.rak.toLowerCase().includes(normalized);
      return matchCategory && matchQuery;
    });
  }, [query, category]);

  const modal = useBookModal(books, filteredBooks);

  return (
    <Section id="katalog" ariaLabelledby="katalog-heading">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2
            id="katalog-heading"
            className="font-heading text-[26px] font-semibold tracking-tight text-ink md:text-[32px]"
          >
            Katalog Buku
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted">
            Cari judul, penulis, atau kode rak. Klik kartu buku untuk melihat sinopsis, lokasi rak, dan perkiraan tanggal kembali.
          </p>
        </div>

        <p className="text-sm text-muted" aria-live="polite">
          Menampilkan <strong className="font-medium text-ink">{filteredBooks.length}</strong> dari {books.length} buku
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-sm">
          <label htmlFor="cari-buku" className="mb-1.5 block text-sm font-medium text-ink">
            Cari buku
          </label>
          <div className="relative">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
            />
            <input
              id="cari-buku"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ketik judul, penulis, atau rak..."
              className="h-11 w-full rounded-[10px] border border-line bg-white pr-4 pl-10 text-sm text-ink placeholder:text-muted transition-colors focus:border-brand"
            />
          </div>
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter kategori buku"
        >
          {BOOK_CATEGORIES.map((item) => (
            <Chip
              key={item.id}
              active={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </Chip>
          ))}
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onSelect={modal.open} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-line bg-surface p-10 text-center">
          <p className="text-sm font-medium text-ink">
            Buku yang kamu cari tidak ditemukan.
          </p>
          <p className="mt-1 text-sm text-muted">
            Coba kata kunci lain atau tampilkan semua kategori.
          </p>
          <div className="mt-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setQuery('');
                setCategory('semua');
              }}
            >
              Reset filter
            </Button>
          </div>
        </div>
      )}

      <BookModal
        book={modal.selectedBook}
        onClose={modal.close}
        hasPrev={modal.hasPrev}
        hasNext={modal.hasNext}
        onPrev={modal.goPrev}
        onNext={modal.goNext}
      />
    </Section>
  );
}
