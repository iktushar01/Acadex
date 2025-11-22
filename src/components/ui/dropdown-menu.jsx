import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenuContext = React.createContext({
  open: false,
  setOpen: () => {},
})

const DropdownMenu = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef(
  ({ className, asChild, children, ...props }, ref) => {
    const { setOpen, open } = React.useContext(DropdownMenuContext)

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        onClick: (e) => {
          if (children.props.onClick) {
            children.props.onClick(e)
          }
          setOpen(!open)
        },
        ...props,
      })
    }

    return (
      <button
        ref={ref}
        className={cn("outline-none", className)}
        onClick={() => setOpen(!open)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef(
  ({ className, align = "end", children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(DropdownMenuContext)
    const contentRef = React.useRef(null)

    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (event) => {
        const parent = contentRef.current?.parentElement
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target) &&
          parent &&
          !parent.contains(event.target)
        ) {
          setOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open, setOpen])

    if (!open) return null

    return (
      <div
        ref={(node) => {
          contentRef.current = node
          if (typeof ref === "function") {
            ref(node)
          }
        }}
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          align === "end" && "right-0",
          align === "start" && "left-0",
          align === "center" && "left-1/2 -translate-x-1/2",
          "top-full mt-1",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: (e) => {
                if (child.props.onClick) {
                  child.props.onClick(e)
                }
                setOpen(false)
              },
            })
          }
          return child
        })}
      </div>
    )
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}
