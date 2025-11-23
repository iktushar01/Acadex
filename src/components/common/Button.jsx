import { cn } from '@/lib/utils'

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  as,
  ...props 
}) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  }

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-11 px-6 text-lg',
    icon: 'h-10 w-10',
  }

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className
  )

  if (as === 'span') {
    return (
      <span className={baseClasses} {...props}>
        {children}
      </span>
    )
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  )
}

