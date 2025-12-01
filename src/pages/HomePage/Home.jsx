import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ArrowRight, Sparkles, FileText, Users, TrendingUp, PenTool, BookOpen, StickyNote } from 'lucide-react'
import Lottie from 'lottie-react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/common/Button'
import LoginModal from '@/components/LoginModal'
import DashboardAccessModal from '@/components/AccessDashboardModal/DashboardAccessModal'
import Features from './Features'
import HowItWorks from './HowItWorks'
import About from './About'
import FeedBack from './FeedBack'
import writingAnimation from '@/assets/Writing.json'

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  'http://localhost:5000'

function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { isSignedIn, user } = useUser()
  const { theme } = useTheme()
  const navigate = useNavigate()

  // Get current theme (light or dark)
  const getCurrentTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  const currentTheme = getCurrentTheme()
  const isDark = currentTheme === 'dark'

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleDashboardClick = () => {
    setIsDashboardModalOpen(true)
  }

  const handleCreateClass = async (data) => {
    try {
      const payload = {
        institutionType: data.institutionType,
        institutionName: data.institutionName,
        departmentName: data.departmentName || null,
        classOrGrade: data.classOrGrade || null,
        section: data.section || null,
        classroomName: data.classroomName,
        classCode: data.classCode,
        capacity: data.capacity ? Number(data.capacity) : null,
      }

      await axios.post(`${API_URL}/classrooms`, payload)

      await Swal.fire({
        icon: 'success',
        title: 'Classroom Created!',
        text: `Your classroom "${data.classroomName}" has been created successfully.`,
        confirmButtonColor: '#f97316',
        confirmButtonText: 'Go to Dashboard',
        timer: 3000,
        timerProgressBar: true,
        colorScheme: isDark ? 'dark' : 'light',
        background: isDark ? '#1a1a1a' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
      })

      setIsDashboardModalOpen(false)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error creating classroom:', error)
      Swal.fire({
        icon: 'error',
        title: 'Failed to Create Classroom',
        text: error.response?.data?.error || 'Failed to create classroom. Please try again.',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'OK',
        colorScheme: isDark ? 'dark' : 'light',
        background: isDark ? '#1a1a1a' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
      })
    }
  }

  const handleJoinClass = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/classrooms/join`, {
        classCode: data.classCode,
        clerkId: user?.id || '',
      })

      await Swal.fire({
        icon: 'success',
        title: 'Joined Classroom!',
        text: `You have successfully joined "${response.data.classroom?.classroomName || 'the classroom'}".`,
        confirmButtonColor: '#f97316',
        confirmButtonText: 'Go to Dashboard',
        timer: 3000,
        timerProgressBar: true,
        colorScheme: isDark ? 'dark' : 'light',
        background: isDark ? '#1a1a1a' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
      })

      setIsDashboardModalOpen(false)
      // Navigate to classroom-specific dashboard
      const classCode = response.data.classroom?.classCode
      if (classCode) {
        navigate(`/dashboard/classroom/${classCode}`)
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error joining classroom:', error)
      Swal.fire({
        icon: 'error',
        title: 'Failed to Join Classroom',
        text: error.response?.data?.error || 'Failed to join classroom. Please check the code and try again.',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'OK',
        colorScheme: isDark ? 'dark' : 'light',
        background: isDark ? '#1a1a1a' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
      })
    }
  }


  return (
    <div className="min-h-screen">
      {/* Hero Section - Notebook Themed */}
      <section id="home" className="relative min-h-[95vh] flex items-center overflow-hidden">
        
        {/* Floating Animated Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-200/40 dark:bg-yellow-900/20 rounded-lg rotate-12 animate-float hidden lg:block" style={{
          animation: 'float 6s ease-in-out infinite',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }} />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-pink-200/40 dark:bg-pink-900/20 rounded-lg -rotate-12 animate-float-delayed hidden lg:block" style={{
          animation: 'float 8s ease-in-out infinite 2s',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }} />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-blue-200/40 dark:bg-blue-900/20 rounded-lg rotate-45 animate-float-slow hidden lg:block" style={{
          animation: 'float 10s ease-in-out infinite 1s',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content - Notebook Style */}
              <div 
                className={`space-y-8 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Badge - Sticky Note Style */}
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-yellow-300 dark:bg-yellow-900/40 border-2 border-yellow-400 dark:border-yellow-700 shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
                  style={{
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)'
                  }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-700 dark:text-yellow-300" />
                  <span className="text-sm font-bold text-yellow-900 dark:text-yellow-100">Welcome to Acadex</span>
                </div>
                
                {/* Main Heading - Handwritten Style */}
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="text-foreground inline-block">Study Smarter,</span>
                    <br />
                    <span 
                      className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent inline-block relative"
                      style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        transform: 'rotate(-1deg)',
                        display: 'inline-block'
                      }}
                    >
                      Together
                    </span>
                    {/* Decorative underline */}
                    <span className="block mt-2 w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full" />
                  </h1>
                  <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-xl border-l-0 sm:border-l-4 pl-0 sm:pl-4 border-primary/30">
                    The modern platform for sharing notes, organizing courses, and collaborating with classmates.
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pl-4">
                  {isSignedIn ? (
                    <Button
                      onClick={handleDashboardClick}
                      size="lg"
                      className="group rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Open Dashboard
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsLoginModalOpen(true)}
                      size="lg"
                      className="group rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Right Content - 3D Notebook */}
              <div 
                className={`relative transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="relative perspective-1000" style={{ perspective: '1000px' }}>
                  {/* Notebook Container */}
                  <div className="relative">
                    {/* Spiral Binding Effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-l-2xl shadow-inner z-20">
                      {/* Spiral Holes */}
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-600 border border-gray-600 dark:border-gray-700"
                          style={{
                            top: `${8 + i * 7}%`,
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)'
                          }}
                        />
                      ))}
                    </div>

                    {/* Notebook Page - Main */}
                    <div 
                      className="relative ml-8 bg-white dark:bg-amber-950/20 rounded-r-2xl shadow-2xl p-8 border-2 border-gray-200 dark:border-gray-700"
                      style={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                        transform: 'rotateY(-5deg) rotateX(2deg)',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'rotateY(-2deg) rotateX(1deg) scale(1.02)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'rotateY(-5deg) rotateX(2deg) scale(1)'
                      }}
                    >
                      {/* Content Area */}
                      <div className="relative z-10 h-[500px] flex flex-col items-center justify-center space-y-6">
                        {/* Animated Pen Icon */}
                        <div className="relative">
                          <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-300 dark:bg-yellow-900/40 rounded-lg rotate-12 shadow-lg animate-bounce-slow" style={{
                            animation: 'bounce 3s ease-in-out infinite'
                          }}>
                            <PenTool className="h-8 w-8 text-yellow-700 dark:text-yellow-300 m-4" />
                          </div>
                        </div>

                        {/* Lottie Animation */}
                        <div className="relative w-full h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-lg" />
                          <Lottie
                            animationData={writingAnimation}
                            loop={true}
                            autoplay={true}
                            className="w-full h-full"
                          />
                        </div>

                        {/* Floating Sticky Notes */}
                        <div className="absolute top-4 right-4 w-24 h-24 bg-pink-200 dark:bg-pink-900/40 rounded-md rotate-6 shadow-lg animate-float" style={{
                          animation: 'float 4s ease-in-out infinite',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}>
                          <StickyNote className="h-6 w-6 text-pink-700 dark:text-pink-300 m-2" />
                        </div>
                        <div className="absolute bottom-8 left-4 w-20 h-20 bg-blue-200 dark:bg-blue-900/40 rounded-md -rotate-6 shadow-lg animate-float-delayed" style={{
                          animation: 'float 5s ease-in-out infinite 1s',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}>
                          <BookOpen className="h-5 w-5 text-blue-700 dark:text-blue-300 m-2" />
                        </div>
                      </div>
                    </div>

                    {/* Page Shadow */}
                    <div 
                      className="absolute inset-0 ml-8 bg-black/10 dark:bg-black/20 rounded-r-2xl blur-xl -z-10"
                      style={{
                        transform: 'translateY(10px) translateX(5px)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-5deg); }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(3deg); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0) rotate(12deg); }
            50% { transform: translateY(-10px) rotate(15deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 8s ease-in-out infinite 2s;
          }
          .animate-float-slow {
            animation: float 10s ease-in-out infinite 1s;
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* About Section */}
      <About />

      {/* Feedback Section */}
      <FeedBack />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Dashboard Access Modal */}
      <DashboardAccessModal
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
        onCreateClass={handleCreateClass}
        onJoinClass={handleJoinClass}
      />
    </div>
  )
}

export default Home
