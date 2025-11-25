import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { dark, light } from '@clerk/themes'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { useTheme } from './theme-provider'
import LoginModal from './LoginModal'
import ClerkUsers from './ClerkUsers'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { isSignedIn } = useUser()
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false) // Close menu after clicking
  }

  return (
    <>
      <ClerkUsers showUi={false} />
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4">
        {/* Desktop & Mobile Header */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
          {/* Logo - Responsive sizing */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1 py-1 min-w-[60px] sm:min-w-[70px] md:min-w-[80px] touch-manipulation"
            aria-label="Go to home"
          >
            Acadex
          </button>

          {/* Desktop Navigation - Hidden on mobile, visible from md */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-2 xl:gap-3">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                variant="ghost"
                size="sm"
                className="rounded-full text-xs md:text-sm lg:text-base xl:text-base px-2 md:px-3 lg:px-4 h-8 md:h-9 lg:h-10 min-h-[32px] md:min-h-[36px] lg:min-h-[40px] touch-manipulation"
              >
                {link.label}
              </Button>
            ))}
          </nav>

          {/* Desktop Actions - Hidden on mobile, visible from md */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 xl:gap-3">
            <div className="scale-90 md:scale-95 lg:scale-100">
              <ModeToggle />
            </div>
            {isSignedIn ? (
              <div className="scale-90 md:scale-95 lg:scale-100">
                <UserButton
                  appearance={{
                    baseTheme: isDark ? dark : light,
                    elements: {
                      avatarBox: 'w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10',
                    },
                  }}
                />
              </div>
            ) : (
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                className="rounded-full bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-xs md:text-sm lg:text-base px-3 md:px-4 lg:px-6 h-8 md:h-9 lg:h-10 min-h-[32px] md:min-h-[36px] lg:min-h-[40px] whitespace-nowrap touch-manipulation"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Actions (Theme Toggle + Hamburger) - Visible only on mobile */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <div className="scale-90 sm:scale-100">
              <ModeToggle />
            </div>
            {isSignedIn && (
              <div className="scale-90 sm:scale-100 mr-0.5 sm:mr-1">
                <UserButton
                  appearance={{
                    baseTheme: isDark ? dark : light,
                    elements: {
                      avatarBox: 'w-8 h-8 sm:w-9 sm:h-9',
                    },
                  }}
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative h-9 w-9 sm:h-10 sm:w-10 text-foreground touch-manipulation min-h-[36px] sm:min-h-[40px]"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {/* Hamburger - 3 lines */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              >
                <span className="w-4 sm:w-5 h-0.5 bg-current rounded-full transition-all" />
                <span className="w-4 sm:w-5 h-0.5 bg-current rounded-full transition-all" />
                <span className="w-4 sm:w-5 h-0.5 bg-current rounded-full transition-all" />
              </div>
              {/* Cross - 2 lines */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-90'
                }`}
              >
                <div className="relative w-4 sm:w-5 h-4 sm:h-5">
                  <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full transform -translate-y-1/2 rotate-45" />
                  <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full transform -translate-y-1/2 -rotate-45" />
                </div>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Smooth slide animation */}
        <nav
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen
              ? 'max-h-[500px] opacity-100 mt-2.5 sm:mt-3'
              : 'max-h-0 opacity-0 mt-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col gap-1.5 sm:gap-2 pb-2 sm:pb-2.5">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                variant="ghost"
                size="sm"
                className="w-full justify-start rounded-lg text-sm sm:text-base h-10 sm:h-11 min-h-[40px] sm:min-h-[44px] px-3 sm:px-4 touch-manipulation"
              >
                {link.label}
              </Button>
            ))}
            {!isSignedIn && (
              <Button
                onClick={() => {
                  setIsLoginModalOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full rounded-full mt-1 sm:mt-1.5 bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm sm:text-base h-10 sm:h-11 min-h-[40px] sm:min-h-[44px] touch-manipulation"
              >
                Get Started
              </Button>
            )}
          </div>
        </nav>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
    </>
  )
}

export default Navbar

