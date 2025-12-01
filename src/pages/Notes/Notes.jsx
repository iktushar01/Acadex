import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Search, Filter, Grid, List, RefreshCw } from 'lucide-react'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { Card, CardContent } from '@/components/common/Card'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { FileText } from 'lucide-react'

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  'http://localhost:5000'

export default function Notes() {
  const { classCode } = useParams()
  const [viewMode, setViewMode] = useState('grid')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const fetchNotes = async () => {
    try {
      setLoading(true)
      setError('')
      const url = classCode 
        ? `${API_URL}/notes?classCode=${classCode}`
        : `${API_URL}/notes`
      const response = await axios.get(url)
      setNotes(response.data || [])
    } catch (err) {
      console.error('Failed to fetch notes:', err)
      setError(err.response?.data?.error || 'Failed to load notes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [classCode])

  const subjects = useMemo(() => {
    const unique = Array.from(new Set(notes.map((note) => note.subject).filter(Boolean)))
    return ['All', ...unique]
  }, [notes])

  const filterBySubject = (note) =>
    selectedFilter === 'All' ? true : note.subject === selectedFilter

  const filterBySearch = (note) => {
    if (!search.trim()) return true
    const term = search.toLowerCase()
    return (
      note.title?.toLowerCase().includes(term) ||
      note.description?.toLowerCase().includes(term) ||
      note.originalFilename?.toLowerCase().includes(term)
    )
  }

  const filteredNotes = notes.filter((note) => filterBySubject(note) && filterBySearch(note))

  const formatDate = (value) => {
    if (!value) return 'Unknown date'
    try {
      const date = new Date(value)
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return value
    }
  }

  const getPrimaryAttachment = (note) => {
    if (Array.isArray(note.attachments) && note.attachments.length > 0) {
      return note.attachments[0]
    }
    return null
  }

  const formatSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    const mb = bytes / (1024 * 1024)
    if (mb >= 1) return `${mb.toFixed(2)} MB`
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your study notes</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchNotes} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button as="a" href={classCode ? `/dashboard/classroom/${classCode}/upload` : '/dashboard/upload'}>
            <FileText className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        {subjects.map((tag) => (
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

      {/* Notes List */}
      {loading ? (
        <div className="rounded-xl border border-border p-10 text-center text-muted-foreground">
          Loading notes...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center text-destructive">
          {error}
        </div>
      ) : filteredNotes.length === 0 ? (
        <EmptyState
          title="No notes yet"
          description="Upload your first note to see it listed here."
          actionLabel="Upload Note"
          actionHref={classCode ? `/dashboard/classroom/${classCode}/upload` : '/dashboard/upload'}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => {
            const attachment = getPrimaryAttachment(note)
            const subjectLabel = note.courseTitle || note.subject || 'No course'
            const fileUrl = attachment?.secureUrl || note.fileUrl
            const fileSize = attachment?.bytes || note.bytes

            return (
            <Card key={note._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                    {subjectLabel}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {note.description || 'No description provided.'}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatDate(note.createdAt)}</span>
                  <span>{formatSize(fileSize)}</span>
                </div>
                {fileUrl && (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block text-sm font-medium text-primary underline"
                  >
                    Open file
                  </a>
                )}
              </CardContent>
            </Card>
          )})}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredNotes.map((note) => {
            const attachment = getPrimaryAttachment(note)
            const subjectLabel = note.courseTitle || note.subject || 'No course'
            const fileUrl = attachment?.secureUrl || note.fileUrl
            const fileSize = attachment?.bytes || note.bytes

            return (
            <Card key={note._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{note.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-muted-foreground">{formatDate(note.createdAt)}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{formatSize(fileSize)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {note.description || 'No description provided.'}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                    {subjectLabel}
                  </span>
                </div>
                {fileUrl && (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center text-sm font-medium text-primary underline"
                  >
                    View file
                  </a>
                )}
              </CardContent>
            </Card>
          )})}
        </div>
      )}
    </div>
  )
}

