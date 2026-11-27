import { Minus, Plus } from 'lucide-react';
import { faqItems } from '../../data/faq';
import Section from '../layout/Section';

export default function Faq() {
  return (
    <Section id="faq" tone="paper" ariaLabelledby="faq-heading">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2
            id="faq-heading"
            className="font-heading text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-semibold tracking-tight text-ink"
          >
            Pertanyaan Umum
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Jawaban singkat seputar keanggotaan, peminjaman buku, dan penggunaan Ruang Diskusi.
          </p>
        </div>

        <div className="divide-y divide-line rounded-card border border-line bg-white lg:col-span-8">
          {faqItems.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-ink transition-colors hover:bg-paper">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors group-open:border-brand/30 group-open:bg-brand-soft group-open:text-brand"
                >
                  <Plus size={16} className="group-open:hidden" />
                  <Minus size={16} className="hidden group-open:block" />
                </span>
              </summary>
              <div className="px-5 pb-5">
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
