import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false) // Close menu after clicking
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Desktop & Mobile Header */}
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <button
            onClick={() => scrollToSection('home')}
            className="text-lg sm:text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            Acadex
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
                {link.label}
              </Button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <ModeToggle />
            <Button
              onClick={() => scrollToSection('features')}
              className="rounded-full"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Actions (Theme Toggle + Hamburger) */}
          <div className="flex md:hidden items-center gap-2 sm:gap-3">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative h-10 w-10 text-foreground"
              aria-label="Toggle menu"
            >
              {/* Hamburger - 3 lines */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              >
                <span className="w-5 h-0.5 bg-current rounded-full transition-all" />
                <span className="w-5 h-0.5 bg-current rounded-full transition-all" />
                <span className="w-5 h-0.5 bg-current rounded-full transition-all" />
              </div>
              {/* Cross - 2 lines */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-90'
                }`}
              >
                <div className="relative w-5 h-5">
                  <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full transform -translate-y-1/2 rotate-45" />
                  <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full transform -translate-y-1/2 -rotate-45" />
                </div>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <nav
          className={`md:hidden mt-3 sm:mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2 sm:gap-2.5 pb-1 sm:pb-2">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                variant="ghost"
                size="sm"
                className="w-full justify-start rounded-lg"
              >
                {link.label}
              </Button>
            ))}
            <Button
              onClick={() => scrollToSection('features')}
              className="w-full rounded-full mt-2"
            >
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

