import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { SITE_CONFIG } from './config/site';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Section from './components/layout/Section';
import Button from './components/ui/Button';
import Hero from './components/home/Hero';
import Services from './components/home/Services';
import CatalogSection from './components/books/CatalogSection';
import BookingSection from './components/booking/BookingSection';
import ClubSchedule from './components/home/ClubSchedule';
import Faq from './components/home/Faq';
import Gallery from './components/home/Gallery';
import StudyCornerSection from './components/study/StudyCornerSection';
import Contact from './components/home/Contact';

const ROUTE_SECTIONS = {
  '/': { id: 'beranda', title: SITE_CONFIG.name },
  '/layanan': { id: 'layanan', title: `Layanan Utama | ${SITE_CONFIG.name}` },
  '/katalog': { id: 'katalog', title: `Katalog Buku | ${SITE_CONFIG.name}` },
  '/pojok-belajar': { id: 'pojok-belajar', title: `Pojok Belajar | ${SITE_CONFIG.name}` },
  '/booking': { id: 'booking', title: `Booking Ruang Diskusi | ${SITE_CONFIG.name}` },
  '/klub-baca': { id: 'klub-baca', title: `Jadwal Klub Baca | ${SITE_CONFIG.name}` },
  '/faq': { id: 'faq', title: `Pertanyaan Umum | ${SITE_CONFIG.name}` },
  '/galeri': { id: 'galeri', title: `Suasana Ruang Baca | ${SITE_CONFIG.name}` },
  '/kontak': { id: 'kontak', title: `Kontak & Lokasi | ${SITE_CONFIG.name}` },
};

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const target = ROUTE_SECTIONS[location.pathname];
    document.title = target
      ? target.title
      : `Halaman Tidak Ditemukan | ${SITE_CONFIG.name}`;

    if (location.hash.startsWith('#buku-')) {
      return;
    }

    if (!target || location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionEl = document.getElementById(target.id);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.pathname, location.hash, location.key]);

  return null;
}

function LibraryProfilePage() {
  return (
    <>
      <Hero />
      <Services headingAs="h2" />
      <CatalogSection />
      <StudyCornerSection />
      <BookingSection />
      <ClubSchedule />
      <Faq />
      <Gallery />
      <Contact />
    </>
  );
}

function NotFoundPage() {
  return (
    <Section tone="paper" ariaLabelledby="not-found-heading">
      <div className="max-w-lg py-10">
        <p className="text-sm font-semibold text-accent">404</p>
        <h1
          id="not-found-heading"
          className="mt-2 font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-tight text-ink"
        >
          Halaman tidak ditemukan.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Tautan yang kamu buka tidak tersedia di Ruang Baca Kampus. Silakan kembali ke beranda atau telusuri katalog buku.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" to="/">
            Kembali ke Beranda
          </Button>
          <Button variant="secondary" to="/katalog">
            Buka Katalog Buku
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
      <RouteEffects />
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="konten-utama" tabIndex={-1} className="flex-1 outline-none">
        <Routes>
          <Route path="/" element={<LibraryProfilePage />} />
          <Route path="/layanan" element={<LibraryProfilePage />} />
          <Route path="/katalog" element={<LibraryProfilePage />} />
          <Route path="/pojok-belajar" element={<LibraryProfilePage />} />
          <Route path="/booking" element={<LibraryProfilePage />} />
          <Route path="/klub-baca" element={<LibraryProfilePage />} />
          <Route path="/faq" element={<LibraryProfilePage />} />
          <Route path="/galeri" element={<LibraryProfilePage />} />
          <Route path="/kontak" element={<LibraryProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
