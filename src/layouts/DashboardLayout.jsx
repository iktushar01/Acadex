import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import ClerkUsers from '@/components/ClerkUsers'

export default function DashboardLayout() {
  return (
    <>
      <ClerkUsers showUi={false} />
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-0 md:ml-64">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

