import { Search, Bell, User } from 'lucide-react'
import { Input } from '../common/Input'
import { Avatar } from '../common/Avatar'
import { Button } from '../common/Button'

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between gap-4 p-4 lg:p-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes, subjects..."
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar src="" fallback="JD" className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </header>
  )
}

