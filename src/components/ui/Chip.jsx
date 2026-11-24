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
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors sm:min-h-10 ${
        active
          ? 'bg-brand text-white'
          : 'border border-line bg-white text-ink hover:border-brand/40 hover:bg-surface'
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
