export default function Chip({
  active = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg px-3.5 text-sm font-medium transition-colors sm:min-h-10 ${
        active
          ? 'border border-brand bg-brand text-white'
          : 'border border-field-border bg-white text-ink hover:border-brand hover:bg-paper active:bg-brand-soft/60'
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
