export default function Badge({
  tone = 'neutral',
  dot = false,
  className = '',
  children,
  ...props
}) {
  const tones = {
    neutral: 'bg-surface text-muted border border-line',
    brand: 'bg-brand-soft text-brand border border-brand/15',
    success: 'bg-success-soft text-success border border-success/15',
    danger: 'bg-danger-soft text-danger border border-danger/15',
  };

  const dotTones = {
    neutral: 'bg-muted',
    brand: 'bg-brand',
    success: 'bg-success',
    danger: 'bg-danger',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${tones[tone]} ${className}`.trim()}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={`size-1.5 shrink-0 rounded-full ${dotTones[tone]}`}
        />
      )}
      {children}
    </span>
  );
}
