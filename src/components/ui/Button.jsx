export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-hover active:bg-brand-hover',
    secondary:
      'border border-line bg-white text-ink hover:border-brand/40 hover:bg-surface active:bg-brand-soft/50',
    ghost: 'text-ink hover:bg-surface active:bg-line/50',
  };

  const sizes = {
    sm: 'min-h-10 px-3.5 text-sm',
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
