import { MapPin } from 'lucide-react';
import BookStatus from './BookStatus';

const CATEGORY_LABELS = {
  kuliah: 'Kuliah',
  novel: 'Novel',
  jurnal: 'Jurnal',
};

export default function BookCard({ book, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(book.id)}
      className="group flex h-full w-full flex-col justify-between rounded-card border border-line bg-white p-5 text-left transition-colors hover:border-brand hover:bg-paper active:bg-brand-soft/40"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
            {CATEGORY_LABELS[book.kategori] ?? book.kategori}
          </span>
          <BookStatus status={book.status} />
        </div>

        <h3 className="mt-3.5 font-heading text-lg leading-snug font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
          {book.judul}
        </h3>
        <p className="mt-1 text-sm text-muted">oleh {book.penulis}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1 font-medium text-ink">
          <MapPin size={14} aria-hidden="true" className="text-accent" />
          Rak {book.rak}
        </span>
        <span className="font-medium text-brand group-hover:underline">Lihat detail</span>
      </div>
    </button>
  );
}
