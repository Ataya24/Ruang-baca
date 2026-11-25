import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import Services from './components/home/Services';
import CatalogSection from './components/books/CatalogSection';
import BookingSection from './components/booking/BookingSection';
import ClubSchedule from './components/home/ClubSchedule';
import Faq from './components/home/Faq';
import Gallery from './components/home/Gallery';
import StudyCornerSection from './components/study/StudyCornerSection';
import Contact from './components/home/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink antialiased">
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-[10px] focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="konten-utama" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <CatalogSection />
        <StudyCornerSection />
        <BookingSection />
        <ClubSchedule />
        <Faq />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
