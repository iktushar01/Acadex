import { Outlet, useParams } from 'react-router-dom'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import ClerkUsers from '@/components/ClerkUsers'

export default function DashboardLayout() {
  const { classCode } = useParams()
  
  return (
    <>
      <ClerkUsers showUi={false} />
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar classCode={classCode} />
        <div className="flex-1 flex flex-col ml-0 md:ml-64">
          <Header classCode={classCode} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

