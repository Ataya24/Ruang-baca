import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import Section from '../layout/Section';

const PHOTOS = [
  {
    src: '/img/library-2.jpg',
    caption: 'Rak Buku Utama',
    alt: 'Deretan rak buku koleksi kuliah, novel, dan jurnal di Ruang Baca Kampus',
    width: 739,
    height: 415,
  },
  {
    src: '/img/library-3.jpg',
    caption: 'Area Meja Baca',
    alt: 'Meja baca tenang dengan pencahayaan nyaman untuk belajar mandiri',
    width: 739,
    height: 415,
  },
  {
    src: '/img/library-1.jpg',
    caption: 'Ruang Diskusi Kelompok',
    alt: 'Ruang diskusi berkapasitas 4 sampai 8 orang dilengkapi papan tulis',
    width: 739,
    height: 415,
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) {
      dialog.showModal();
    } else if (!selected && dialog.open) {
      dialog.close();
    }
  }, [selected]);

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
      if (pressedOutside && isOutside(event)) dialog.close();
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const [featured, ...secondary] = PHOTOS;

  return (
    <>
      <Section id="galeri" tone="surface" compact ariaLabelledby="galeri-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="galeri-heading"
            className="font-heading text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-semibold tracking-tight text-ink"
          >
            Suasana Ruang Baca
          </h2>
          <p className="text-sm text-muted">Klik foto untuk memperbesar tampilan</p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-12">
          <button
            type="button"
            onClick={() => setSelected(featured)}
            aria-label={`Perbesar foto ${featured.caption}`}
            className="group relative overflow-hidden rounded-media border border-line text-left lg:col-span-7"
          >
            <img
              src={featured.src}
              alt={featured.alt}
              width={featured.width}
              height={featured.height}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute right-3.5 bottom-3.5 rounded-md bg-ink/90 px-3 py-1.5 text-xs font-medium text-white">
              {featured.caption}
            </span>
          </button>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {secondary.map((photo) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setSelected(photo)}
                aria-label={`Perbesar foto ${photo.caption}`}
                className="group relative overflow-hidden rounded-media border border-line text-left"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="aspect-[16/10] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute right-3.5 bottom-3.5 rounded-md bg-ink/90 px-3 py-1.5 text-xs font-medium text-white">
                  {photo.caption}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Section>

      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="galeri-modal-caption"
        onClose={() => setSelected(null)}
        className="m-auto max-h-[90vh] max-w-4xl overflow-visible bg-transparent p-4 text-white"
      >
        {selected && (
          <figure className="relative">
            <img
              src={selected.src}
              alt={selected.alt}
              width="960"
              height="640"
              className="max-h-[78vh] w-auto rounded-media object-contain"
            />
            <figcaption
              id="galeri-modal-caption"
              className="mt-3 text-center text-sm font-medium text-white"
            >
              {selected.caption}
            </figcaption>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Tutup tampilan foto"
              className="absolute -top-2 -right-2 inline-flex size-11 items-center justify-center rounded-full bg-white text-ink shadow-md transition-colors hover:bg-surface"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
}
