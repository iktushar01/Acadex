import { Card, CardContent } from '@/components/common/Card'
import { Avatar } from '@/components/common/Avatar'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Search, UserPlus, MessageCircle } from 'lucide-react'

const dummyClassmates = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', notes: 45, subjects: 6, avatar: '' },
  { id: 2, name: 'Michael Chen', email: 'michael@example.com', notes: 32, subjects: 5, avatar: '' },
  { id: 3, name: 'Emily Davis', email: 'emily@example.com', notes: 58, subjects: 7, avatar: '' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', notes: 28, subjects: 4, avatar: '' },
  { id: 5, name: 'Jessica Martinez', email: 'jessica@example.com', notes: 41, subjects: 6, avatar: '' },
  { id: 6, name: 'Ryan Thompson', email: 'ryan@example.com', notes: 36, subjects: 5, avatar: '' },
]

export default function Classmates() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classmates</h1>
          <p className="text-muted-foreground mt-1">Connect and collaborate with your peers</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Classmate
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search classmates..."
          className="pl-10"
        />
      </div>

      {/* Classmates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {dummyClassmates.map((classmate) => (
          <Card key={classmate.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar src={classmate.avatar} fallback={classmate.name.split(' ').map(n => n[0]).join('')} className="h-16 w-16" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{classmate.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{classmate.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-muted">
                <div className="text-center">
                  <p className="text-2xl font-bold">{classmate.notes}</p>
                  <p className="text-xs text-muted-foreground">Notes</p>
                </div>
                <div className="h-8 w-px bg-border"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{classmate.subjects}</p>
                  <p className="text-xs text-muted-foreground">Subjects</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="ghost" size="icon">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

