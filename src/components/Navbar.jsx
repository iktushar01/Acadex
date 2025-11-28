import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { dark, light } from '@clerk/themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from './theme-provider'
import LoginModal from './LoginModal'
import ClerkUsers from './ClerkUsers'
import Logo from './Logo'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'about', label: 'About' },
  { id: 'feedback', label: 'Feedback' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { isSignedIn } = useUser()
  const { theme, setTheme } = useTheme()

  // Handle scroll effect and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      
      // Determine active section based on scroll position
      const sections = navLinks.map(link => {
        const element = document.getElementById(link.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return {
            id: link.id,
            top: rect.top,
            bottom: rect.bottom,
          }
        }
        return null
      }).filter(Boolean)

      // Find the section currently in view
      const currentSection = sections.find(section => 
        section.top <= 100 && section.bottom >= 100
      ) || sections[0]

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine current theme
  const getCurrentTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  const currentTheme = getCurrentTheme()
  const isDark = currentTheme === 'dark'

  // Toggle theme between light and dark only
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id) // Set active section immediately on click
    }
    setIsMenuOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <ClerkUsers showUi={false} />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/98 backdrop-blur-xl shadow-lg border-b border-border/50'
            : 'bg-background/95 backdrop-blur-md border-b border-border/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section */}
            <Logo onClick={() => scrollToSection('home')} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    {link.label}
                    {/* Active Indicator */}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
                    )}
                    {/* Hover Indicator */}
                    {!isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full group-hover:w-3/4 transition-all duration-300" />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle - Sun/Moon Only */}
              <button
                onClick={toggleTheme}
                className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg border border-border bg-background hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Toggle theme"
              >
                <Sun
                  className={`absolute w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                    isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
                  } text-amber-500`}
                />
                <Moon
                  className={`absolute w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                    isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
                  } text-blue-400`}
                />
              </button>

              {/* User Button or Get Started - Desktop */}
              {isSignedIn ? (
                <div className="hidden md:block">
                  <UserButton
                    appearance={{
                      baseTheme: isDark ? dark : light,
                      elements: {
                        avatarBox: 'w-9 h-9 md:w-10 md:h-10',
                      },
                    }}
                  />
                </div>
              ) : (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden md:flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4 md:px-5 h-9 md:h-10 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-border bg-background hover:bg-accent flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <Menu
                  className={`absolute w-5 h-5 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`absolute w-5 h-5 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 top-16 md:top-20 bg-background/95 backdrop-blur-xl z-40"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="bg-background border-t border-border shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-2 mb-6">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.id
                    return (
                      <button
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center gap-3 ${
                          isActive
                            ? 'bg-orange-500/15 text-foreground shadow-sm border border-orange-500/20'
                            : 'text-foreground hover:bg-accent hover:text-primary'
                        }`}
                        style={{
                          animation: isMenuOpen ? `slideIn 0.3s ease-out ${index * 50}ms both` : 'none',
                        }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-orange-500 transition-opacity ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                        {link.label}
                      </button>
                    )
                  })}
                </nav>

                {/* Mobile User Actions */}
                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  {isSignedIn ? (
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm font-medium text-muted-foreground">Account</span>
                      <UserButton
                        appearance={{
                          baseTheme: isDark ? dark : light,
                          elements: {
                            avatarBox: 'w-9 h-9',
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsLoginModalOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 h-11 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20" />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
