import { Card, CardContent, CardHeader, CardTitle } from '../common/Card'
import { Button } from '../common/Button'
import { Download, Eye, MoreVertical } from 'lucide-react'

const dummyData = [
  { id: 1, title: 'Calculus Chapter 5', subject: 'Mathematics', date: '2 days ago', views: 45 },
  { id: 2, title: 'Organic Chemistry Notes', subject: 'Chemistry', date: '5 days ago', views: 32 },
  { id: 3, title: 'World War II Summary', subject: 'History', date: '1 week ago', views: 78 },
  { id: 4, title: 'Shakespeare Analysis', subject: 'Literature', date: '2 weeks ago', views: 56 },
  { id: 5, title: 'Physics Lab Report', subject: 'Physics', date: '3 weeks ago', views: 23 },
]

export function DummyTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Uploads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Subject</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Views</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <p className="font-medium">{row.title}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      {row.subject}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{row.date}</td>
                  <td className="p-4 text-sm text-muted-foreground">{row.views}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

