import { BookOpen, CalendarDays, Users } from 'lucide-react';
import Section from '../layout/Section';

const SERVICES = [
  {
    icon: BookOpen,
    title: 'Peminjaman Buku',
    description:
      'Pinjam hingga 3 buku sekaligus selama 14 hari dengan opsi perpanjangan satu kali untuk buku kuliah, novel, dan jurnal.',
    href: '#katalog',
    linkLabel: 'Buka katalog',
  },
  {
    icon: Users,
    title: 'Ruang Diskusi',
    description:
      'Pesan slot 2 jam untuk belajar kelompok beranggotakan 4 sampai 8 orang dengan jadwal ketersediaan yang jelas.',
    href: '#booking',
    linkLabel: 'Cek slot ruang',
  },
  {
    icon: CalendarDays,
    title: 'Klub Baca Mingguan',
    description:
      'Setiap Jumat pukul 16.00 WIB, anggota berkumpul membahas satu buku pilihan bersama moderator mahasiswa.',
    href: '#klub-baca',
    linkLabel: 'Lihat jadwal',
  },
];

export default function Services() {
  return (
    <Section id="layanan" surface ariaLabelledby="layanan-heading">
      <div className="max-w-xl">
        <h2
          id="layanan-heading"
          className="font-heading text-[26px] font-semibold tracking-tight text-ink md:text-[32px]"
        >
          Layanan Utama
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Tiga fasilitas gratis yang dapat dimanfaatkan seluruh mahasiswa dengan Kartu Tanda Mahasiswa aktif.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, description, href, linkLabel }) => (
          <article
            key={title}
            className="flex flex-col justify-between rounded-card border border-line bg-white p-6 transition-colors hover:border-brand/40"
          >
            <div>
              <div className="flex size-11 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </div>

            <div className="mt-6 pt-3">
              <a
                href={href}
                className="text-sm font-medium text-brand transition-colors hover:text-brand-hover hover:underline"
              >
                {linkLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
