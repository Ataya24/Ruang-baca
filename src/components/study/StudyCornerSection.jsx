import Section from '../layout/Section';
import ReadingCounter from './ReadingCounter';
import ReadingTodoList from './ReadingTodoList';
import BookRecommendations from './BookRecommendations';

export default function StudyCornerSection() {
  return (
    <Section id="pojok-belajar" surface ariaLabelledby="pojok-belajar-heading">
      <div className="max-w-2xl">
        <h2
          id="pojok-belajar-heading"
          className="font-heading text-[26px] font-semibold tracking-tight text-ink md:text-[32px]"
        >
          Pojok Belajar
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Bantu sesi belajarmu di Ruang Baca tetap fokus dengan penghitung halaman, daftar rencana baca, dan rekomendasi buku minggu ini.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ReadingCounter />
        </div>
        <div className="lg:col-span-7">
          <ReadingTodoList />
        </div>
        <div className="lg:col-span-12">
          <BookRecommendations />
        </div>
      </div>
    </Section>
  );
}
