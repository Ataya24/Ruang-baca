import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import { ROOM_CONFIG } from '../../config/room';
import BookStatus from './BookStatus';
import Button from '../ui/Button';

const CATEGORY_LABELS = {
  kuliah: 'Kuliah',
  novel: 'Novel',
  jurnal: 'Jurnal',
};

function getInitials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export default function BookModal({
  book,
  onClose,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (book && !dialog.open) {
      dialog.showModal();
    } else if (!book && dialog.open) {
      dialog.close();
    }
  }, [book]);

  // Fallback light-dismiss untuk browser yang belum mendukung closedby="any" (Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

    const isOutside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (event) => {
      pressedOutside = isOutside(event);
    };
    const onPointerUp = (event) => {
      if (pressedOutside && isOutside(event)) {
        dialog.close();
      }
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const hasValidWhatsApp =
    Boolean(ROOM_CONFIG.whatsappNumber) &&
    /^\d{10,15}$/.test(ROOM_CONFIG.whatsappNumber);

  const whatsappHref =
    book && hasValidWhatsApp
      ? `https://wa.me/${ROOM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
          `Halo Ruang Baca, saya ingin menanyakan ketersediaan buku "${book.judul}" (Rak ${book.rak}).`
        )}`
      : null;

  const metadataItems = book
    ? [
        { label: 'Lokasi Rak', value: book.rak },
        { label: 'Penerbit', value: book.penerbit },
        { label: 'Tahun Terbit', value: book.tahun },
        { label: 'Jumlah Halaman', value: book.halaman ? `${book.halaman} hlm` : null },
        { label: 'ISBN', value: book.isbn },
      ].filter((item) => item.value !== null && item.value !== undefined && item.value !== '')
    : [];

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="book-modal-title"
      onClose={onClose}
      className="m-0 mt-auto max-h-[90vh] w-full max-w-none overflow-y-auto rounded-t-media border border-line bg-white p-0 text-ink shadow-xl sm:m-auto sm:max-w-2xl sm:rounded-media"
    >
      {book && (
        <div>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-6 py-4">
            <span className="rounded-md bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
              {CATEGORY_LABELS[book.kategori] ?? book.kategori}
            </span>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Tutup detail buku"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-field-border text-ink transition-colors hover:bg-surface"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-12">
              <div className="sm:col-span-4">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={`Sampul buku ${book.judul}`}
                    width="240"
                    height="320"
                    className="aspect-[3/4] w-full rounded-card border border-line object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-[3/4] w-full flex-col justify-between rounded-card border border-brand/15 bg-brand-soft p-5"
                  >
                    <span className="text-xs font-medium text-brand">
                      Rak {book.rak}
                    </span>
                    <div>
                      <span className="font-heading text-4xl font-semibold tracking-tight text-brand">
                        {getInitials(book.judul)}
                      </span>
                      <p className="mt-2 line-clamp-2 text-xs text-muted">
                        {book.judul}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="sm:col-span-8">
                <h3
                  id="book-modal-title"
                  className="font-heading text-2xl font-semibold tracking-tight text-ink"
                >
                  {book.judul}
                </h3>
                <p className="mt-1 text-sm text-muted">oleh {book.penulis}</p>

                <div className="mt-3">
                  <BookStatus
                    status={book.status}
                    tanggalKembali={book.tanggalKembali}
                    showReturnDate
                  />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {book.sinopsis}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-card border border-line bg-surface p-4 text-sm">
                  {metadataItems.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs text-muted">{item.label}</dt>
                      <dd className="mt-0.5 font-medium text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label="Buku sebelumnya"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Sebelumnya
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label="Buku berikutnya"
                >
                  Berikutnya
                  <ChevronRight size={16} aria-hidden="true" />
                </Button>
              </div>

              {whatsappHref ? (
                <Button
                  variant="primary"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Tanya via WhatsApp
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  Tanya via WhatsApp
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
