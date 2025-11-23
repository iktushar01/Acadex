import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { BookOpen, Plus, FileText } from 'lucide-react'

const dummySubjects = [
  { id: 1, name: 'Mathematics', count: 32, color: 'bg-blue-500' },
  { id: 2, name: 'Physics', count: 18, color: 'bg-purple-500' },
  { id: 3, name: 'Chemistry', count: 24, color: 'bg-green-500' },
  { id: 4, name: 'History', count: 15, color: 'bg-orange-500' },
  { id: 5, name: 'Literature', count: 21, color: 'bg-pink-500' },
  { id: 6, name: 'Biology', count: 12, color: 'bg-teal-500' },
  { id: 7, name: 'Computer Science', count: 28, color: 'bg-indigo-500' },
  { id: 8, name: 'Economics', count: 9, color: 'bg-yellow-500' },
]

export default function Subjects() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subjects</h1>
          <p className="text-muted-foreground mt-1">Organize your notes by subject</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </Button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {dummySubjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl ${subject.color} flex items-center justify-center`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
              <p className="text-sm text-muted-foreground">
                {subject.count} {subject.count === 1 ? 'note' : 'notes'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

