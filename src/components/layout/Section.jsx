export default function Section({
  id,
  surface = false,
  tone,
  compact = false,
  className = '',
  ariaLabelledby,
  children,
}) {
  const resolvedTone = tone ?? (surface ? 'surface' : 'paper');
  const backgrounds = {
    paper: 'bg-paper',
    surface: 'bg-surface border-y border-line',
    white: 'bg-white border-y border-line',
  };

  const spacing = compact ? 'py-10 md:py-16' : 'py-12 md:py-20';

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`scroll-mt-20 ${spacing} ${backgrounds[resolvedTone] ?? backgrounds.paper} ${className}`.trim()}
    >
      <div className="mx-auto max-w-[1120px] px-5">{children}</div>
    </section>
  );
}
