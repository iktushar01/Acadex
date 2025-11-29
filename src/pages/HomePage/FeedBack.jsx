import { useState } from 'react'
import { MessageSquare, Send, CheckCircle2, Bug, Sparkles, Lightbulb, Mail } from 'lucide-react'
import { Button } from '@/components/common/Button'

const feedbackTypes = [
  {
    id: 'ui',
    label: 'UI Improvement',
    icon: Sparkles,
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Suggest design improvements and UI enhancements',
  },
  {
    id: 'feature',
    label: 'Feature Request',
    icon: Lightbulb,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Request new features and functionality',
  },
  {
    id: 'bug',
    label: 'Bug Report',
    icon: Bug,
    gradient: 'from-red-500 to-orange-500',
    description: 'Report bugs and technical issues',
  },
]

function FeedBack() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1000)
  }

  return (
    <section id="feedback" className="py-24 md:py-32 relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="absolute top-32 right-20 w-40 h-40 bg-pink-200/20 dark:bg-pink-900/10 rounded-lg rotate-12 animate-float hidden xl:block" style={{
        animation: 'float 8s ease-in-out infinite',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }} />
      <div className="absolute bottom-40 left-24 w-32 h-32 bg-blue-200/20 dark:bg-blue-900/10 rounded-lg -rotate-12 animate-float-delayed hidden xl:block" style={{
        animation: 'float 10s ease-in-out infinite 2s',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header - Notebook Style */}
          <div className="text-center space-y-6 mb-20 pl-0 sm:pl-4 lg:pl-0">
            {/* Sticky Note Badge */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-yellow-300 dark:bg-yellow-900/40 border-2 border-yellow-400 dark:border-yellow-700 shadow-lg rotate-[-1deg] hover:rotate-0 transition-transform duration-300"
              style={{
                boxShadow: '0 4px 8px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'
              }}
            >
              <MessageSquare className="h-4 w-4 text-yellow-900 dark:text-yellow-100" />
              <span className="text-sm font-bold text-yellow-900 dark:text-yellow-100">Your Feedback</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-foreground">Help Us</span>
              <br />
              <span 
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent inline-block relative"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  transform: 'rotate(-0.5deg)',
                  display: 'inline-block'
                }}
              >
                Improve Acadex
              </span>
              {/* Decorative underline */}
              <span className="block mt-3 w-40 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mx-auto" />
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto border-l-0 sm:border-l-4 pl-0 sm:pl-4 border-primary/30 leading-relaxed">
              Your feedback shapes the future of Acadex. Share your ideas for UI improvements, request new features, 
              or report bugs. Every suggestion helps us create a better experience for everyone.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 pl-0 sm:pl-4 lg:pl-0">
            {/* Feedback Types - Notebook Style */}
            <div className="space-y-6">
              <div 
                className="relative bg-white dark:bg-amber-950/20 rounded-lg shadow-lg p-6 -rotate-1"
                style={{
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(0,0,0,0.05)'
                }}
              >
                {/* Corner Tear Effect */}
                <div className="absolute top-2 right-2 w-6 h-6 opacity-20">
                  <div className="w-full h-full border-t-2 border-r-2 border-gray-400 dark:border-gray-600 rounded-tr-lg" />
                </div>
                
                <h3 
                  className="text-2xl font-bold text-foreground mb-6 relative inline-block"
                  style={{ transform: 'rotate(-0.3deg)' }}
                >
                  What would you like to share?
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30" />
                </h3>
                
                <div className="space-y-4">
                  {feedbackTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = formData.feedbackType === type.id
                    
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, feedbackType: type.id }))}
                        className={`w-full group relative bg-white dark:bg-amber-950/20 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 border-2 ${
                          isSelected 
                            ? 'border-primary scale-105' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                        }`}
                        style={{
                          boxShadow: isSelected 
                            ? '0 8px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
                            : '0 4px 8px rgba(0,0,0,0.1)',
                          transform: isSelected ? 'scale(1.05) rotate(0deg)' : 'rotate(0.5deg)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'scale(1.02) rotate(0deg)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'rotate(0.5deg)'
                          }
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div 
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            style={{
                              boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                            }}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="font-bold text-foreground mb-1">{type.label}</h4>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                    <span className="text-sm">support@acadex.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Form - Notebook Style */}
            <div 
              className="relative bg-white dark:bg-amber-950/20 rounded-lg shadow-lg p-8 md:p-10 rotate-1"
              style={{
                boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(0,0,0,0.05)'
              }}
            >
              {/* Corner Tear Effect */}
              <div className="absolute top-2 right-2 w-6 h-6 opacity-20">
                <div className="w-full h-full border-t-2 border-r-2 border-gray-400 dark:border-gray-600 rounded-tr-lg" />
              </div>
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                  <div 
                    className="w-20 h-20 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg"
                    style={{
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
                      transform: 'rotate(6deg)'
                    }}
                  >
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                  <h3 
                    className="text-2xl font-bold text-foreground"
                    style={{ transform: 'rotate(-0.3deg)' }}
                  >
                    Feedback Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for helping us improve Acadex. We'll review your feedback soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="text-sm font-bold mb-2 block text-foreground"
                      style={{ transform: 'rotate(-0.2deg)' }}
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="text-sm font-bold mb-2 block text-foreground"
                      style={{ transform: 'rotate(-0.2deg)' }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className="text-sm font-bold mb-2 block text-foreground"
                      style={{ transform: 'rotate(-0.2deg)' }}
                    >
                      Your Feedback
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        formData.feedbackType === 'ui' 
                          ? "Describe the UI improvement you'd like to see..."
                          : formData.feedbackType === 'feature'
                          ? "Tell us about the feature you'd like us to add..."
                          : formData.feedbackType === 'bug'
                          ? "Describe the bug you encountered..."
                          : "Share your feedback, ideas, or report issues..."
                      }
                      required
                      rows={6}
                      className="w-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.feedbackType}
                    className="w-full group rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Submit Feedback
                        <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              )}
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
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 10s ease-in-out infinite 2s;
        }
      `}</style>
    </section>
  )
}

export default FeedBack
