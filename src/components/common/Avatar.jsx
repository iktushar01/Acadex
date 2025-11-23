import { cn } from '@/lib/utils'

export function Avatar({ src, alt, className, fallback, ...props }) {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted',
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
          {fallback || 'U'}
        </div>
      )}
    </div>
  )
}

export function AvatarGroup({ children, className, ...props }) {
  return (
    <div className={cn('flex -space-x-2', className)} {...props}>
      {children}
    </div>
  )
}

