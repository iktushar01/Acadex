import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { BookOpen, Plus, FileText } from 'lucide-react'
import axios from 'axios'
import AddCourseModal from './AddCourseModal'

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  'http://localhost:5000'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/courses`)
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleAddCourse = () => {
    setIsModalOpen(true)
  }

  const handleCourseAdded = () => {
    fetchCourses()
    setIsModalOpen(false)
  }

  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500',
    'bg-pink-500', 'bg-teal-500', 'bg-indigo-500', 'bg-yellow-500'
  ]

  const getColor = (index) => colors[index % colors.length]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-1">Organize your notes by course</p>
        </div>
        <Button onClick={handleAddCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No courses yet. Add your first course!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {courses.map((course, index) => (
            <Card key={course._id} className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl ${getColor(index)} flex items-center justify-center`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{course.faculty}</p>
                <p className="text-sm text-muted-foreground">
                  {course.noteCount || 0} {course.noteCount === 1 ? 'note' : 'notes'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AddCourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleCourseAdded}
      />
    </div>
  )
}

