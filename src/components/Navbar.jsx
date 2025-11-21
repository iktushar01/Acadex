import { Button } from '@/components/ui/button'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-6 py-4">
        <button
          onClick={() => scrollToSection('home')}
          className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
        >
          Acadex
        </button>
        <nav className="flex-1 flex items-center justify-center gap-2 flex-wrap">
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
        <Button
          onClick={() => scrollToSection('features')}
          className="rounded-full"
        >
          Get Started
        </Button>
      </div>
    </header>
  )
}

export default Navbar

