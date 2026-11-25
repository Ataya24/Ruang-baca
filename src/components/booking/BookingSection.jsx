import Section from '../layout/Section';
import BookingForm from './BookingForm';
import DueDateCalculator from './DueDateCalculator';

export default function BookingSection() {
  return (
    <Section id="booking" ariaLabelledby="booking-heading">
      <div className="max-w-2xl">
        <h2
          id="booking-heading"
          className="font-heading text-[26px] font-semibold tracking-tight text-ink md:text-[32px]"
        >
          Booking Ruang Diskusi
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Cek ketersediaan slot 2 jam untuk kelompok 4 sampai 8 orang, lalu kirim ringkasan booking langsung melalui WhatsApp.
        </p>
      </div>

      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <BookingForm />
        </div>
        <div className="lg:col-span-5">
          <DueDateCalculator />
        </div>
      </div>
    </Section>
  );
}
