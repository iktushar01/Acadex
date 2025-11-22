import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { SignIn } from '@clerk/clerk-react'
import { dark, light } from '@clerk/themes'
import { X, Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

/**
 * LoginModal Component
 * 
 * Displays Clerk's sign-in UI inside a react-modal.
 * 
 * IMPORTANT: To show Google as the only sign-in option:
 * 1. Go to Clerk Dashboard → User & Authentication → Social connections
 * 2. Add Google connection
 * 3. Disable all other providers (Email, Phone, etc.)
 * 4. Save changes
 */
function LoginModal({ isOpen, onClose }) {
  const [isClerkLoaded, setIsClerkLoaded] = useState(false)
  const { theme } = useTheme()

  // Determine current theme (handle "system" by checking prefers-color-scheme)
  const getCurrentTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  const currentTheme = getCurrentTheme()
  const isDark = currentTheme === 'dark'

  useEffect(() => {
    // Check if Clerk is loaded
    const checkClerk = () => {
      if (window.Clerk) {
        setIsClerkLoaded(true)
      } else {
        // Retry after a short delay
        setTimeout(checkClerk, 100)
      }
    }
    checkClerk()
  }, [isOpen])

  // Custom styles for the modal overlay and content (theme-aware)
  const customStyles = {
    overlay: {
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      transition: 'background-color 0.3s ease',
    },
    content: {
      position: 'relative',
      inset: 'auto',
      border: 'none',
      borderRadius: '1rem',
      padding: 0,
      maxWidth: '28rem',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      backgroundColor: 'transparent',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Sign in to your account"
      aria={{
        labelledby: 'modal-title',
        describedby: 'modal-description',
      }}
      closeTimeoutMS={200}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}
    >
      <div className="relative bg-card text-card-foreground rounded-xl shadow-xl border border-border overflow-hidden transition-all duration-300">
        {/* Theme Toggle & Close Button */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2
              id="modal-title"
              className="text-2xl font-bold text-card-foreground mb-2 transition-colors duration-300"
            >
              Welcome Back
            </h2>
            <p
              id="modal-description"
              className="text-sm text-muted-foreground transition-colors duration-300"
            >
              Sign in with Google to get started
            </p>
          </div>

          {/* Clerk Sign-In Component */}
          <div className="flex justify-center">
            {isClerkLoaded ? (
              <SignIn
                routing="hash"
                appearance={{
                  baseTheme: isDark ? dark : light,
                  elements: {
                    rootBox: 'mx-auto',
                    card: 'shadow-none border-none bg-transparent',
                  },
                }}
              />
            ) : (
              <div className="py-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-sm text-muted-foreground transition-colors duration-300">
                  Loading sign-in options...
                </p>
              </div>
            )}
          </div>

          {/* Fallback message if Clerk fails */}
          {!isClerkLoaded && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg transition-colors duration-300">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Having trouble loading? Please check your Clerk configuration and ensure
                VITE_CLERK_PUBLISHABLE_KEY is set correctly.
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

// Theme Toggle Component (simple button)
function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    // Cycle through: light -> dark -> system -> light
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  // Determine icon based on current effective theme
  const getCurrentTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  const currentTheme = getCurrentTheme()
  const isDark = currentTheme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
      title={`Current: ${theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  )
}

export default LoginModal

