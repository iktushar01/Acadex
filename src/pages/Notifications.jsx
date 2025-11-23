import { Card, CardContent } from '@/components/common/Card'
import { Bell, FileText, UserPlus, MessageCircle, CheckCircle } from 'lucide-react'

const dummyNotifications = [
  { id: 1, type: 'upload', icon: FileText, title: 'New note shared', message: 'Sarah Johnson shared "Calculus Chapter 5"', time: '2 hours ago', read: false },
  { id: 2, type: 'friend', icon: UserPlus, title: 'Friend request', message: 'Michael Chen wants to connect', time: '5 hours ago', read: false },
  { id: 3, type: 'message', icon: MessageCircle, title: 'New message', message: 'Emily Davis sent you a message', time: '1 day ago', read: true },
  { id: 4, type: 'upload', icon: FileText, title: 'Note updated', message: 'David Wilson updated "Physics Lab Report"', time: '2 days ago', read: true },
  { id: 5, type: 'friend', icon: CheckCircle, title: 'Connection accepted', message: 'Jessica Martinez accepted your request', time: '3 days ago', read: true },
  { id: 6, type: 'upload', icon: FileText, title: 'New note shared', message: 'Ryan Thompson shared "History Notes"', time: '1 week ago', read: true },
]

export default function Notifications() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground mt-1">Stay updated with your study community</p>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {dummyNotifications.map((notification) => {
          const Icon = notification.icon
          return (
            <Card
              key={notification.id}
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                !notification.read ? 'border-primary/50 bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                    !notification.read ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      !notification.read ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

