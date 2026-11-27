export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-brand text-white hover:bg-brand-hover active:bg-brand-hover disabled:hover:bg-brand',
    secondary:
      'border border-field-border bg-white text-ink hover:border-brand hover:bg-paper active:bg-brand-soft/60 disabled:hover:border-field-border disabled:hover:bg-white',
    ghost:
      'text-ink hover:bg-surface active:bg-line/70 disabled:hover:bg-transparent',
  };

  const sizes = {
    sm: 'min-h-11 px-3.5 text-sm sm:min-h-10',
    md: 'min-h-11 px-5 text-sm',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={props.type ?? 'button'} className={classes} {...props}>
      {children}
    </button>
  );
}
