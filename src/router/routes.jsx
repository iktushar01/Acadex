import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import Home from '@/pages/HomePage/Home'
import DashboardHome from '@/pages/DashboardHome'
import Notes from '@/pages/Notes'
import Subjects from '@/pages/Subjects'
import UploadNote from '@/pages/UploadNote'
import Classmates from '@/pages/Classmates'
import Notifications from '@/pages/Notifications'
import Settings from '@/pages/Settings'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: '/dashboard', element: <DashboardHome /> },
      { path: '/dashboard/notes', element: <Notes /> },
      { path: '/dashboard/subjects', element: <Subjects /> },
      { path: '/dashboard/upload', element: <UploadNote /> },
      { path: '/dashboard/classmates', element: <Classmates /> },
      { path: '/dashboard/notifications', element: <Notifications /> },
      { path: '/dashboard/settings', element: <Settings /> },
    ],
  },
])

export default router

