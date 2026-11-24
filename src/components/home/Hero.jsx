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
    <Section id="beranda" ariaLabelledby="hero-heading" className="pt-12 md:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h1
            id="hero-heading"
            className="font-heading text-[36px] leading-[1.14] font-semibold tracking-tight text-ink md:text-[56px] md:leading-[1.08]"
          >
            Ruang baca tenang untuk belajar dan berdiskusi.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Perpustakaan komunitas yang dikelola mahasiswa. Telusuri katalog buku lengkap dengan lokasi rak, cek slot Ruang Diskusi, dan ikuti Klub Baca setiap Jumat sore.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="primary" href="#katalog">
              Lihat Katalog
            </Button>
            <Button variant="secondary" href="#booking">
              Booking Ruang
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6">
            {stats.map((item) => (
              <div key={item.label}>
                <dd className="font-heading text-2xl font-semibold tracking-tight text-ink">
                  {item.value}
                </dd>
                <dt className="mt-0.5 text-xs text-muted">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <img
            src="/img/library-2.jpg"
            alt="Rak buku dan suasana belajar di Ruang Baca Kampus"
            width="739"
            height="415"
            fetchPriority="high"
            className="aspect-[16/11] w-full rounded-media border border-line object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
