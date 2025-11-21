import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

