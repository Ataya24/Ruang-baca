import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { isLibraryOpenWIB } from '../../lib/dates';
import Badge from '../ui/Badge';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(() => isLibraryOpenWIB());
  const toggleBtnRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="font-heading text-xl font-semibold tracking-tight text-ink transition-colors hover:text-brand"
          >
            {SITE_CONFIG.shortName}
          </Link>
          <Badge tone={isOpen ? 'success' : 'danger'} dot role="status">
            {isOpen ? 'Buka' : 'Tutup'}
          </Badge>
        </div>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex list-none items-center gap-0.5 text-sm font-medium">
            {SITE_CONFIG.navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `inline-flex min-h-10 items-center rounded-lg px-2.5 transition-colors ${
                      isActive
                        ? 'bg-brand-soft font-semibold text-brand'
                        : 'text-muted hover:bg-surface hover:text-ink'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleBtnRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="navigasi-seluler"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-field-border bg-white px-3 text-sm font-medium text-ink transition-colors hover:bg-surface lg:hidden"
        >
          {menuOpen ? (
            <>
              <X size={18} aria-hidden="true" />
              <span>Tutup</span>
            </>
          ) : (
            <>
              <Menu size={18} aria-hidden="true" />
              <span>Menu</span>
            </>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="navigasi-seluler"
          aria-label="Navigasi seluler"
          className="border-t border-line bg-paper px-5 py-3 lg:hidden"
        >
          <ul className="grid gap-1 text-sm font-medium">
            <li>
              <NavLink
                to="/"
                end
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-11 items-center rounded-lg px-3 transition-colors ${
                    isActive
                      ? 'bg-brand-soft font-semibold text-brand'
                      : 'text-ink hover:bg-surface'
                  }`
                }
              >
                Beranda
              </NavLink>
            </li>
            {SITE_CONFIG.navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-11 items-center rounded-lg px-3 transition-colors ${
                      isActive
                        ? 'bg-brand-soft font-semibold text-brand'
                        : 'text-ink hover:bg-surface'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
