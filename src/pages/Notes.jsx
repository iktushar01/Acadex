import { useState } from 'react'
import { Search, Filter, Grid, List } from 'lucide-react'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { Card, CardContent } from '@/components/common/Card'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { FileText } from 'lucide-react'

const filterTags = ['All', 'Mathematics', 'Physics', 'Chemistry', 'History', 'Literature']

const dummyNotes = [
  { id: 1, title: 'Calculus Chapter 5', subject: 'Mathematics', date: '2 days ago', size: '2.4 MB' },
  { id: 2, title: 'Organic Chemistry Notes', subject: 'Chemistry', date: '5 days ago', size: '1.8 MB' },
  { id: 3, title: 'World War II Summary', subject: 'History', date: '1 week ago', size: '3.2 MB' },
  { id: 4, title: 'Shakespeare Analysis', subject: 'Literature', date: '2 weeks ago', size: '1.5 MB' },
  { id: 5, title: 'Physics Lab Report', subject: 'Physics', date: '3 weeks ago', size: '2.1 MB' },
  { id: 6, title: 'Algebra Basics', subject: 'Mathematics', date: '1 month ago', size: '1.2 MB' },
]

export default function Notes() {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedFilter, setSelectedFilter] = useState('All')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your study notes</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="flex border border-border rounded-xl overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {filterTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedFilter === tag ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Notes Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                    {note.subject}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{note.date}</span>
                  <span>{note.size}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {dummyNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{note.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{note.size}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                    {note.subject}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

