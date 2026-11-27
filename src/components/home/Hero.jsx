import { books } from '../../data/books';
import { ROOM_CONFIG } from '../../config/room';
import Section from '../layout/Section';
import Button from '../ui/Button';

export default function Hero() {
  const stats = [
    { value: String(books.length), label: 'Koleksi buku' },
    { value: String(ROOM_CONFIG.slots.length), label: 'Slot diskusi / hari' },
    { value: '14 hari', label: 'Masa pinjam' },
  ];

  return (
    <Section id="beranda" tone="paper" ariaLabelledby="hero-heading" className="pt-10 md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h1
            id="hero-heading"
            className="font-heading text-[clamp(2.1rem,4.6vw,3.45rem)] leading-[1.08] font-semibold tracking-tight text-ink"
          >
            Ruang baca tenang untuk belajar dan berdiskusi.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Perpustakaan komunitas yang dikelola mahasiswa. Telusuri katalog buku lengkap dengan lokasi rak, cek slot Ruang Diskusi, dan ikuti Klub Baca setiap Jumat sore.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button variant="primary" to="/katalog">
              Telusuri Katalog Buku
            </Button>
            <Button variant="secondary" to="/booking">
              Booking Ruang Diskusi
            </Button>
          </div>

          <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-line pt-6 sm:gap-6">
            {stats.map((item) => (
              <div key={item.label}>
                <dd className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
                  {item.value}
                </dd>
                <dt className="mt-0.5 text-xs text-muted">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <figure className="lg:col-span-6">
          <img
            src="/img/library-2.jpg"
            alt="Rak buku dan suasana belajar di Ruang Baca Kampus"
            width="739"
            height="415"
            fetchPriority="high"
            className="aspect-[16/11] w-full rounded-media border border-line object-cover"
          />
          <figcaption className="mt-2.5 flex items-center justify-between text-xs text-muted">
            <span>Gedung Kegiatan Mahasiswa, Lantai 1</span>
            <span>Senin - Jumat, 08.00 - 20.00 WIB</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
