import { useMemo } from 'react';
import { Link } from 'react-router';
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
    <Section id="klub-baca" tone="surface" ariaLabelledby="klub-baca-heading">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2
            id="klub-baca-heading"
            className="font-heading text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-semibold tracking-tight text-ink"
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
        <p className="mt-8 rounded-card border border-dashed border-field-border bg-white p-8 text-center text-sm text-muted">
          Belum ada jadwal Klub Baca terbaru.
        </p>
      ) : (
        <ol className="mt-8 grid gap-3">
          {clubSchedule.map((item, index) => {
            const dateInfo = upcomingDates[index];
            const isNearest = index === 0;

            return (
              <li
                key={item.id}
                className={`flex flex-col gap-4 rounded-card border p-5 transition-colors sm:flex-row sm:items-center ${
                  isNearest
                    ? 'border-accent/40 bg-white'
                    : 'border-line bg-paper hover:border-brand/40'
                }`}
              >
                <div
                  className={`flex w-16 shrink-0 flex-col items-center justify-center rounded-lg border py-2.5 text-center ${
                    isNearest
                      ? 'border-accent bg-accent text-white'
                      : 'border-line bg-white text-ink'
                  }`}
                >
                  <span className="font-heading text-2xl leading-none font-semibold">
                    {dateInfo.dayNumber}
                  </span>
                  <span
                    className={`mt-1 text-xs font-medium uppercase ${
                      isNearest ? 'text-white/95' : 'text-muted'
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
                    {isNearest && <Badge tone="accent">Jadwal terdekat</Badge>}
                  </div>

                  <h3 className="mt-1 font-heading text-lg font-semibold tracking-tight text-ink">
                    <Link
                      to={`/katalog#buku-${item.id}`}
                      className="transition-colors hover:text-brand hover:underline"
                    >
                      {item.judul}
                    </Link>
                  </h3>
                  <p className="mt-0.5 text-sm text-muted">
                    oleh {item.penulis} · Moderator: {item.pembahas}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-muted sm:max-w-xs sm:text-right">
                  {item.catatan}
                </p>
              </li>
            );
          })}
        </ol>
      )}
    </Section>
  );
}
