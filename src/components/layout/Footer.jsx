import { SITE_CONFIG } from '../../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface py-12">
      <div className="mx-auto max-w-[1120px] px-5">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#beranda"
              className="font-heading text-xl font-semibold tracking-tight text-ink"
            >
              {SITE_CONFIG.name}
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          <nav aria-label="Tautan cepat" className="md:col-span-4">
            <h2 className="font-sans text-sm font-semibold text-ink">Navigasi</h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-4 text-sm text-muted">
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-10 items-center transition-colors hover:text-brand hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="font-sans text-sm font-semibold text-ink">Ikuti Kami</h2>
            <div className="mt-3 flex gap-2.5">
              {SITE_CONFIG.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-field-border bg-white text-ink transition-colors hover:border-brand hover:bg-paper hover:text-brand"
                >
                  {social.id === 'instagram' ? (
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ) : (
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {SITE_CONFIG.name}.</p>
          <p>{SITE_CONFIG.hoursLabel}</p>
        </div>
      </div>
    </footer>
  );
}
