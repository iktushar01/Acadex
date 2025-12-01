import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import Home from '@/pages/HomePage/Home'
import DashboardHome from '@/pages/DashboardHome'
import Notes from '@/pages/Notes/Notes'
import Courses from '@/pages/Courses/Courses'
import UploadNote from '@/pages/UploadNote/UploadNote'
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
      // General dashboard routes (backward compatibility)
      { path: '/dashboard', element: <DashboardHome /> },
      { path: '/dashboard/notes', element: <Notes /> },
      { path: '/dashboard/courses', element: <Courses /> },
      { path: '/dashboard/upload', element: <UploadNote /> },
      { path: '/dashboard/classmates', element: <Classmates /> },
      { path: '/dashboard/notifications', element: <Notifications /> },
      { path: '/dashboard/settings', element: <Settings /> },
      // Classroom-specific routes
      {
        path: '/dashboard/classroom/:classCode',
        children: [
          { index: true, element: <DashboardHome /> },
          { path: 'notes', element: <Notes /> },
          { path: 'courses', element: <Courses /> },
          { path: 'upload', element: <UploadNote /> },
          { path: 'classmates', element: <Classmates /> },
          { path: 'notifications', element: <Notifications /> },
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },
])

export default router

