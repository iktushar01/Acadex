import { useState } from 'react'
import axios from 'axios'
import Modal from '@/ReuseableComponent/Modal.jsx'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  'http://localhost:5000'

export default function AddCourseModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    faculty: '',
    code: '',
    description: '',
    semester: '',
    credits: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.title.trim() || !formData.faculty.trim()) {
      setError('Title and Faculty are required fields')
      return
    }

    try {
      setLoading(true)
      const payload = {
        title: formData.title.trim(),
        faculty: formData.faculty.trim(),
        code: formData.code.trim() || null,
        description: formData.description.trim() || null,
        semester: formData.semester.trim() || null,
        credits: formData.credits.trim() ? parseInt(formData.credits) : null,
      }

      await axios.post(`${API_URL}/courses`, payload)
      
      // Reset form
      setFormData({
        title: '',
        faculty: '',
        code: '',
        description: '',
        semester: '',
        credits: '',
      })
      
      onSuccess()
    } catch (err) {
      console.error('Error adding course:', err)
      setError(err.response?.data?.error || 'Failed to add course. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Add New Course"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Course Title <span className="text-destructive">*</span>
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Introduction to Computer Science"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="faculty" className="text-sm font-medium">
            Faculty Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            placeholder="e.g., Dr. John Smith"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Course Code
            </label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., CS101"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="credits" className="text-sm font-medium">
              Credits
            </label>
            <Input
              id="credits"
              name="credits"
              type="number"
              value={formData.credits}
              onChange={handleChange}
              placeholder="e.g., 3"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="semester" className="text-sm font-medium">
            Semester
          </label>
          <Input
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            placeholder="e.g., Fall 2024"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course description..."
            rows="3"
            className="flex w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Course'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

