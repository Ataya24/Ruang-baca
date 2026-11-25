import { Minus, Plus } from 'lucide-react';
import { faqItems } from '../../data/faq';
import Section from '../layout/Section';

export default function Faq() {
  return (
    <Section id="faq" ariaLabelledby="faq-heading">
      <div className="max-w-xl">
        <h2
          id="faq-heading"
          className="font-heading text-[26px] font-semibold tracking-tight text-ink md:text-[32px]"
        >
          Pertanyaan Umum
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Jawaban singkat seputar keanggotaan, peminjaman buku, dan penggunaan Ruang Diskusi.
        </p>
      </div>

      <div className="mt-8 divide-y divide-line rounded-card border border-line bg-white">
        {faqItems.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-ink transition-colors hover:bg-surface/70">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors group-open:border-brand/30 group-open:bg-brand-soft group-open:text-brand"
              >
                <Plus size={15} className="group-open:hidden" />
                <Minus size={15} className="hidden group-open:block" />
              </span>
            </summary>
            <div className="px-5 pb-5">
              <p className="max-w-3xl text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
