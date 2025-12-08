import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { SignIn } from '@clerk/clerk-react'
import { dark, light } from '@clerk/themes'
import { X } from 'lucide-react'
import { useTheme } from './theme-provider'
import logoImage from '@/assets/logo.png'

/**
 * LoginModal Component
 * 
 * Displays Acadex sign-in UI inside a react-modal.
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
    // Check if authentication is loaded
    const checkAuth = () => {
      if (window.Clerk) {
        setIsClerkLoaded(true)
      } else {
        // Retry after a short delay
        setTimeout(checkAuth, 100)
      }
    }
    checkAuth()
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
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
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
          {/* Header with Acadex Logo */}
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img 
                  src={logoImage} 
                  alt="Acadex Logo" 
                  className="w-16 h-16 rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-amber-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <h2
              id="modal-title"
              className="text-2xl font-bold text-card-foreground mb-2 transition-colors duration-300"
            >
              Welcome to Acadex
            </h2>
            <p
              id="modal-description"
              className="text-sm text-muted-foreground transition-colors duration-300"
            >
              Sign in with Google to continue
            </p>
          </div>

          {/* Acadex Sign-In Component */}
          <div className="flex justify-center">
            {isClerkLoaded ? (
              <SignIn
                routing="hash"
                appearance={{
                  baseTheme: isDark ? dark : light,
                  elements: {
                    rootBox: 'mx-auto',
                    card: 'shadow-none border-none bg-transparent',
                    footer: 'hidden',
                    footerText: 'hidden',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtonsBlockButton: 'bg-background hover:bg-accent border-0 transition-all duration-300 hover:shadow-md hover:scale-[1.02]',
                    socialButtonsBlockButtonText: 'text-foreground hover:text-foreground',
                  },
                  layout: {
                    socialButtonsPlacement: 'top',
                    showOptionalFields: false,
                  },
                  variables: {
                    colorPrimary: 'hsl(45, 89%, 51%)',
                    colorText: isDark ? 'hsl(0, 0%, 96%)' : 'hsl(0, 0%, 10%)',
                    colorBackground: isDark ? 'hsl(0, 0%, 11%)' : 'hsl(0, 0%, 100%)',
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

          {/* Fallback message if sign-in fails */}
          {!isClerkLoaded && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg transition-colors duration-300">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Having trouble loading? Please check your configuration and ensure
                VITE_CLERK_PUBLISHABLE_KEY is set correctly.
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal

