import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Upload,
  Users,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Avatar } from '../common/Avatar'
import { cn } from '@/lib/utils'

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/dashboard/notes', icon: FileText, label: 'Notes' },
  { path: '/dashboard/subjects', icon: BookOpen, label: 'Subjects' },
  { path: '/dashboard/upload', icon: Upload, label: 'Upload' },
  { path: '/dashboard/classmates', icon: Users, label: 'Classmates' },
  { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()

  const fullName =
    user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() || 'Student'
  const email = user?.primaryEmailAddress?.emailAddress || 'Signed in user'

  const nameInitials = [user?.firstName?.charAt(0), user?.lastName?.charAt(0)]
    .filter(Boolean)
    .join('')
    .toUpperCase()

  const usernameInitials = user?.username ? user.username.slice(0, 2).toUpperCase() : ''

  const avatarFallback = nameInitials || usernameInitials || email.slice(0, 2).toUpperCase() || 'JD'

  const handleLogout = () => {
    signOut({ redirectUrl: '/' })
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col transform -translate-x-full md:translate-x-0 transition-transform duration-300">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Acadex</h1>
        <p className="text-sm text-muted-foreground mt-1">Study Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors cursor-pointer">
          <Avatar src={user?.imageUrl || ''} fallback={avatarFallback || 'JD'} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {isLoaded ? fullName : 'Loading...'}
            </p>
            <p className="text-xs text-muted-foreground truncate">{isLoaded ? email : ''}</p>
          </div>
        </div>
        <button
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors mt-2 disabled:opacity-60"
          onClick={handleLogout}
          disabled={!isLoaded}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

