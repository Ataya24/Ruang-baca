import { Link } from 'react-router';
import Section from '../layout/Section';

const SERVICES = [
  {
    number: '01',
    title: 'Peminjaman Buku',
    meta: 'Maks. 3 buku · 14 hari',
    description:
      'Pinjam buku kuliah, novel, dan jurnal dengan opsi perpanjangan satu kali di meja pengurus.',
    to: '/katalog',
    linkLabel: 'Buka katalog buku',
  },
  {
    number: '02',
    title: 'Ruang Diskusi Kelompok',
    meta: 'Slot 2 jam · 4-8 orang',
    description:
      'Ruang tertutup berpapan tulis untuk kerja kelompok dengan jadwal ketersediaan yang transparan.',
    to: '/booking',
    linkLabel: 'Cek slot tersedia',
  },
  {
    number: '03',
    title: 'Klub Baca Mingguan',
    meta: 'Setiap Jumat · 16.00 WIB',
    description:
      'Sesi bedah buku terbuka bersama moderator mahasiswa di Ruang Diskusi tanpa biaya pendaftaran.',
    to: '/klub-baca',
    linkLabel: 'Lihat jadwal Jumat',
  },
];

export default function Services({ headingAs = 'h2' }) {
  const HeadingTag = headingAs;

  return (
    <Section id="layanan" tone="surface" compact ariaLabelledby="layanan-heading">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <HeadingTag
            id="layanan-heading"
            className="font-heading text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-semibold tracking-tight text-ink"
          >
            Layanan Utama
          </HeadingTag>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Tiga fasilitas gratis yang dapat dimanfaatkan seluruh mahasiswa dengan Kartu Tanda Mahasiswa aktif.
          </p>
        </div>

        <ol className="divide-y divide-line border-t border-b border-line lg:col-span-8">
          {SERVICES.map(({ number, title, meta, description, to, linkLabel }) => (
            <li
              key={title}
              className="grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <span className="font-heading text-lg font-semibold text-accent sm:col-span-1">
                {number}
              </span>
              <div className="sm:col-span-8">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
                    {title}
                  </h3>
                  <span className="text-xs font-medium text-muted">{meta}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </div>
              <div className="sm:col-span-3 sm:text-right">
                <Link
                  to={to}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-brand underline-offset-4 transition-colors hover:text-brand-hover hover:underline sm:min-h-10"
                >
                  {linkLabel}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
