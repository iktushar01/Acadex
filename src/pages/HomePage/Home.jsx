import { Button } from '@/components/ui/button'
import Features from './Features'
import HowItWorks from './HowItWorks'
import About from './About'
import Contact from './Contact'

function Home() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section id="home" className="pt-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-card rounded-3xl shadow-sm p-10 border border-border">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Acadex</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Share Notes. Study Together. Stay Ahead.
            </h1>
            <p className="text-lg text-muted-foreground">
              A simple platform for classmates to upload, organize, and share study materials effortlessly.
            </p>
            <Button
              onClick={() => scrollToSection('features')}
              size="lg"
              className="rounded-full"
            >
              Explore Features
            </Button>
          </div>
          <div className="h-80 bg-gradient-to-br from-muted to-muted/50 rounded-2xl border border-dashed border-border flex items-center justify-center text-muted-foreground text-lg">
            Illustration Placeholder
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />
    </div>
  )
}

export default Home
