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
      className="group flex h-full w-full flex-col justify-between rounded-card border border-line bg-white p-5 text-left transition-colors hover:border-brand/40 hover:bg-surface/50 active:bg-brand-soft/30"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
            {CATEGORY_LABELS[book.kategori] ?? book.kategori}
          </span>
          <BookStatus status={book.status} />
        </div>

        <h3 className="mt-3.5 font-heading text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
          {book.judul}
        </h3>
        <p className="mt-1 text-sm text-muted">oleh {book.penulis}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} aria-hidden="true" className="text-muted" />
          Rak {book.rak}
        </span>
        <span className="font-medium text-brand">Lihat detail</span>
      </div>
    </button>
  );
}
