import { useState } from 'react';
import { Check, Clock, Copy, Mail, MapPin, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { ROOM_CONFIG } from '../../config/room';
import { isLibraryOpenWIB } from '../../lib/dates';
import Section from '../layout/Section';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const isOpen = isLibraryOpenWIB();

  const hasValidWhatsApp =
    Boolean(ROOM_CONFIG.whatsappNumber) &&
    /^\d{10,15}$/.test(ROOM_CONFIG.whatsappNumber);

  const waHref = hasValidWhatsApp
    ? `https://wa.me/${ROOM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        'Halo pengurus Ruang Baca Kampus, saya ingin bertanya informasi layanan.'
      )}`
    : null;

  async function handleCopyAddress() {
    try {
      await navigator.clipboard.writeText(
        `${SITE_CONFIG.address}, ${SITE_CONFIG.addressNote}`
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Section id="kontak" ariaLabelledby="kontak-heading">
      <div className="max-w-xl">
        <h2
          id="kontak-heading"
          className="font-heading text-[26px] font-semibold tracking-tight text-ink md:text-[32px]"
        >
          Kontak &amp; Lokasi
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Kunjungi langsung ruang baca kami atau hubungi pengurus melalui email dan WhatsApp.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="flex flex-col justify-between rounded-card border border-line bg-white p-6">
          <div>
            <div className="flex size-10 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
              <MapPin size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight text-ink">
              Alamat
            </h3>
            <p className="mt-2 text-sm font-medium text-ink">
              {SITE_CONFIG.address}
            </p>
            <p className="mt-1 text-sm text-muted">{SITE_CONFIG.addressNote}</p>
          </div>

          <div className="mt-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyAddress}
              className="w-full sm:w-auto"
            >
              {copied ? (
                <>
                  <Check size={15} aria-hidden="true" className="text-success" />
                  Alamat tersalin
                </>
              ) : (
                <>
                  <Copy size={15} aria-hidden="true" />
                  Salin alamat
                </>
              )}
            </Button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Alamat berhasil disalin ke papan klip.' : ''}
            </span>
          </div>
        </article>

        <article className="flex flex-col justify-between rounded-card border border-line bg-white p-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex size-10 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
                <Clock size={20} aria-hidden="true" />
              </div>
              <Badge tone={isOpen ? 'success' : 'danger'} dot>
                {isOpen ? 'Sedang buka' : 'Sedang tutup'}
              </Badge>
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight text-ink">
              Jam Buka
            </h3>
            <p className="mt-2 text-sm font-medium text-ink">
              {SITE_CONFIG.hoursLabel}
            </p>
            <p className="mt-1 text-sm text-muted">{SITE_CONFIG.closedLabel}</p>
          </div>

          <p className="mt-6 text-xs text-muted">
            Semua jadwal mengikuti waktu Indonesia Barat (WIB).
          </p>
        </article>

        <article className="flex flex-col justify-between rounded-card border border-line bg-white p-6">
          <div>
            <div className="flex size-10 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
              <Mail size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight text-ink">
              Hubungi Pengurus
            </h3>
            <p className="mt-2 text-sm text-muted">
              Email:{' '}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="font-medium text-brand hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
            </p>
            <p className="mt-1 text-sm text-muted">
              Respon cepat untuk konfirmasi booking ruang dan ketersediaan buku.
            </p>
          </div>

          <div className="mt-6">
            {waHref ? (
              <Button
                variant="primary"
                size="sm"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MessageCircle size={15} aria-hidden="true" />
                Chat via WhatsApp
              </Button>
            ) : (
              <Button variant="primary" size="sm" disabled>
                Chat via WhatsApp
              </Button>
            )}
          </div>
        </article>
      </div>
    </Section>
  );
}
