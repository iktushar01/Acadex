import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Lottie from 'lottie-react'
import { Button } from '@/components/ui/button'
import LoginModal from '@/components/LoginModal'
import Features from './Features'
import HowItWorks from './HowItWorks'
import About from './About'
import Contact from './Contact'
import writingAnimation from '@/assets/Writing.json'

function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  const handleDashboardClick = () => {
    navigate('/dashboard')
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section id="home" className="pt-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-card rounded-3xl shadow-sm p-10 border border-border bg-note-grid relative overflow-hidden">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Acadex</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Share Notes. Study Together. Stay Ahead.
            </h1>
            <p className="text-lg text-muted-foreground">
              A simple platform for classmates to upload, organize, and share study materials effortlessly.
            </p>
            <div className="flex gap-4">
              {isSignedIn ? (
                <Button
                  onClick={handleDashboardClick}
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
          <div className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden">
            <Lottie
              animationData={writingAnimation}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
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

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}

export default Home
