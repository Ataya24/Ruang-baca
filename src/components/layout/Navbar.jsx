import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { isLibraryOpenWIB } from '../../lib/dates';
import Badge from '../ui/Badge';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(() => isLibraryOpenWIB());

  useEffect(() => {
    const refresh = () => setIsOpen(isLibraryOpenWIB());
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    window.addEventListener('focus', refresh);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-3">
          <a
            href="#beranda"
            className="font-heading text-lg font-semibold tracking-tight text-ink"
          >
            {SITE_CONFIG.shortName}
          </a>
          <Badge tone={isOpen ? 'success' : 'danger'} dot role="status">
            {isOpen ? 'Buka' : 'Tutup'}
          </Badge>
        </div>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex list-none items-center gap-1 text-sm font-medium">
            {SITE_CONFIG.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-10 items-center rounded-lg px-3 text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="navigasi-seluler"
          aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-white text-ink transition-colors hover:bg-surface lg:hidden"
        >
          {menuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="navigasi-seluler"
          aria-label="Navigasi seluler"
          className="border-t border-line bg-white px-5 py-3 lg:hidden"
        >
          <ul className="grid gap-1 text-sm font-medium">
            {SITE_CONFIG.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 text-ink transition-colors hover:bg-surface"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
