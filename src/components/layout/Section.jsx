export default function Section({
  id,
  surface = false,
  className = '',
  ariaLabelledby,
  children,
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`scroll-mt-20 py-16 md:py-24 ${surface ? 'bg-surface' : 'bg-white'} ${className}`.trim()}
    >
      <div className="mx-auto max-w-[1120px] px-5">{children}</div>
    </section>
  );
}
