import { useMemo } from 'react';
import { clubSchedule } from '../../data/schedule';
import { getUpcomingFridays } from '../../lib/dates';
import Section from '../layout/Section';
import Badge from '../ui/Badge';

export default function ClubSchedule() {
  const upcomingDates = useMemo(
    () => getUpcomingFridays(clubSchedule.length),
    []
  );

  return (
    <Section id="klub-baca" surface ariaLabelledby="klub-baca-heading">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2
            id="klub-baca-heading"
            className="font-heading text-[26px] font-semibold tracking-tight text-ink md:text-[32px]"
          >
            Jadwal Klub Baca
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted">
            Diskusi terbuka setiap Jumat pukul 16.00 sampai 18.00 WIB di Ruang Diskusi.
          </p>
        </div>
        <span className="text-xs font-medium text-muted">
          Slot Jumat 16.00 otomatis dipesan untuk Klub Baca
        </span>
      </div>

      {clubSchedule.length === 0 ? (
        <p className="mt-8 rounded-card border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
          Belum ada jadwal Klub Baca terbaru.
        </p>
      ) : (
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {clubSchedule.map((item, index) => {
            const dateInfo = upcomingDates[index];
            const isNearest = index === 0;

            return (
              <li
                key={item.id}
                className={`flex gap-4 rounded-card border p-5 transition-colors ${
                  isNearest
                    ? 'border-brand/40 bg-brand-soft/40'
                    : 'border-line bg-white hover:border-brand/30'
                }`}
              >
                <div
                  className={`flex w-16 shrink-0 flex-col items-center justify-center rounded-[10px] border py-2.5 text-center ${
                    isNearest
                      ? 'border-brand bg-brand text-white'
                      : 'border-line bg-surface text-ink'
                  }`}
                >
                  <span className="font-heading text-2xl leading-none font-semibold">
                    {dateInfo.dayNumber}
                  </span>
                  <span
                    className={`mt-1 text-xs font-medium uppercase ${
                      isNearest ? 'text-white/90' : 'text-muted'
                    }`}
                  >
                    {dateInfo.monthShort}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-muted">
                      {dateInfo.fullLabel} · 16.00 WIB
                    </span>
                    {isNearest && <Badge tone="brand">Jadwal terdekat</Badge>}
                  </div>

                  <h3 className="mt-1.5 font-heading text-base font-semibold tracking-tight text-ink">
                    <a
                      href={`#buku-${item.id}`}
                      className="transition-colors hover:text-brand hover:underline"
                    >
                      {item.judul}
                    </a>
                  </h3>
                  <p className="mt-0.5 text-sm text-muted">
                    oleh {item.penulis} · Moderator: {item.pembahas}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.catatan}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </Section>
  );
}
