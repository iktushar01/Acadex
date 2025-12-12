import logoImage from '@/assets/logo.png'

function Logo({ onClick, className = '' }) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Default behavior: scroll to home
      const element = document.getElementById('home')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 sm:gap-3 group focus:outline-none rounded-2xl px-3 py-2 -ml-2 relative overflow-visible ${className}`}
        aria-label="Go to home"
      >
        {/* Logo Icon Container with 3D Effect */}
        <div className="relative transform group-hover:rotate-3 transition-transform duration-500">
          {/* Outer Glow Ring - Enhanced */}
          <div className="absolute inset-0 bg-linear-to-br from-orange-500/60 via-orange-500/30 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow scale-125" />
          
          {/* Middle Glow Layer */}
          <div className="absolute inset-0 bg-linear-to-br from-orange-500/40 via-orange-500/20 to-transparent rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
          
          {/* Logo Image with Modern Effects */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] group-hover:scale-110 transition-all duration-500 transform group-hover:-translate-y-1">
            <img 
              src={logoImage} 
              alt="Acadex Logo" 
              className="w-full h-full object-cover"
            />
            {/* Animated Gradient Mesh Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </div>
        </div>
        
        {/* Modern Logo Text with Advanced Effects */}
        <div className="relative">
          {/* Text Glow Effect */}
          <span className="absolute inset-0 text-lg sm:text-xl md:text-2xl font-bold bg-linear-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500">
            Acadex
          </span>
          
          {/* Main Text - Visible by default */}
          <span className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold text-orange-500 dark:text-orange-400 group-hover:bg-linear-to-r group-hover:from-orange-500 group-hover:via-amber-500 group-hover:to-yellow-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 drop-shadow-sm transform group-hover:scale-105 inline-block">
            Acadex
          </span>
          
          {/* Animated Underline with Gradient */}
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-400 rounded-full group-hover:w-full transition-all duration-700 ease-out shadow-lg shadow-orange-500/50" />
          
          {/* Secondary Underline Glow */}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-orange-400 to-amber-400 rounded-full group-hover:w-full transition-all duration-1000 ease-out opacity-60 blur-sm" />
        </div>
        
        {/* Floating Particles Effect */}
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float-particle" />
        <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-float-particle-delayed" />
      </button>

      {/* Modern CSS Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.8;
          }
          33% {
            transform: translateY(-8px) translateX(4px) scale(1.2);
            opacity: 1;
          }
          66% {
            transform: translateY(-4px) translateX(-4px) scale(0.9);
            opacity: 0.6;
          }
        }
        
        @keyframes float-particle-delayed {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.7;
          }
          33% {
            transform: translateY(6px) translateX(-6px) scale(1.1);
            opacity: 1;
          }
          66% {
            transform: translateY(3px) translateX(3px) scale(0.8);
            opacity: 0.5;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
        
        .animate-float-particle-delayed {
          animation: float-particle-delayed 3.5s ease-in-out infinite 0.5s;
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  )
}

export default Logo
