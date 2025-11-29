import { forwardRef } from 'react'
import { Input } from './Input'
import { cn } from '@/lib/utils'

export const FormInput = forwardRef(({ 
  label, 
  name, 
  type = 'text', 
  register, 
  errors, 
  placeholder,
  className,
  required,
  ...props 
}, ref) => {
  const error = errors?.[name]
  // register can be either a function (register function) or an object (register result)
  const registerProps = typeof register === 'function' ? register(name) : (register || {})
  
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={name} 
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        ref={ref}
        {...registerProps}
        placeholder={placeholder}
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">
          {error.message}
        </p>
      )}
    </div>
  )
})

FormInput.displayName = 'FormInput'

