import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import CloudinaryUpload from './CloudinaryUpload'

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  'http://localhost:5000'

export default function UploadNote() {
  const { classCode } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    description: '',
  })
  const [uploadedAssets, setUploadedAssets] = useState([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [courses, setCourses] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [coursesError, setCoursesError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true)
        const url = classCode 
          ? `${API_URL}/courses?classCode=${classCode}`
          : `${API_URL}/courses`
        const response = await axios.get(url)
        setCourses(response.data || [])
        setCoursesError('')
      } catch (error) {
        console.error('Failed to load courses:', error)
        setCoursesError('Could not load courses. Please try again later.')
      } finally {
        setCoursesLoading(false)
      }
    }

    fetchCourses()
  }, [classCode])

  const selectedCourse = courses.find((course) => course._id === formData.courseId)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setMessage({ type: '', text: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage({ type: '', text: '' })

    if (!uploadedAssets.length) {
      setMessage({ type: 'error', text: 'Please upload at least one file before saving the note.' })
      return
    }

    if (!formData.title.trim() || !formData.courseId.trim()) {
      setMessage({ type: 'error', text: 'Title and course are required.' })
      return
    }

    try {
      setSaving(true)
      const primaryAsset = uploadedAssets[0]
      await axios.post(`${API_URL}/notes`, {
        title: formData.title.trim(),
        subject: selectedCourse?.title,
        courseId: formData.courseId,
        courseTitle: selectedCourse?.title,
        description: formData.description.trim(),
        attachments: uploadedAssets.map((item) => ({
          secureUrl: item.secureUrl,
          publicId: item.publicId,
          originalFilename: item.originalFilename,
          resourceType: item.resourceType,
          format: item.format,
          bytes: item.bytes,
          folder: item.folder,
          relativePath: item.relativePath,
        })),
        fileUrl: primaryAsset?.secureUrl,
        publicId: primaryAsset?.publicId,
        originalFilename: primaryAsset?.originalFilename,
        resourceType: primaryAsset?.resourceType,
        format: primaryAsset?.format,
        bytes: primaryAsset?.bytes,
        classCode: classCode || null,
      })

      setMessage({ type: 'success', text: 'Note uploaded successfully.' })
      setFormData({ title: '', courseId: '', description: '' })
      setUploadedAssets([])
    } catch (error) {
      console.error('Failed to save note:', error)
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to save note. Please try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 ">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Note</h1>
        <p className="text-muted-foreground mt-1">
          Upload your file to Cloudinary, then save the note for everyone to view.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step 1 · Upload your file</CardTitle>
        </CardHeader>
        <CardContent>
          <CloudinaryUpload onUploadComplete={setUploadedAssets} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 2 · Add note details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium mb-2 block">
                Title <span className="text-destructive">*</span>
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter note title"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="text-sm font-medium mb-2 block">
                Course <span className="text-destructive">*</span>
              </label>
              <select
                id="courseId"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                required
                className="flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">{coursesLoading ? 'Loading courses...' : 'Select a course'}</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              {coursesError && (
                <p className="mt-2 text-sm text-destructive">
                  {coursesError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium mb-2 block">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add a short description (optional)"
                rows={4}
                className="flex w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            {uploadedAssets.length > 0 ? (
              <div className="space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
                <p className="font-medium text-primary">Uploaded files ({uploadedAssets.length})</p>
                <ul className="space-y-1 text-muted-foreground">
                  {uploadedAssets.map((asset) => (
                    <li key={asset.publicId || asset.secureUrl} className="flex items-center justify-between gap-2">
                      <span className="truncate">{asset.originalFilename || asset.publicId}</span>
                      <span className="text-xs">
                        {asset.bytes ? `${(asset.bytes / 1024 / 1024).toFixed(2)} MB` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                Upload a file in Step 1 to attach it to this note.
              </div>
            )}

            {message.text && (
              <div
                className={`rounded-lg border p-3 text-sm ${
                  message.type === 'success'
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                    : 'border-destructive/30 bg-destructive/10 text-destructive'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1" disabled={saving}>
                {saving ? 'Saving...' : 'Save Note'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({ title: '', courseId: '', description: '' })
                  setUploadedAssets([])
                  setMessage({ type: '', text: '' })
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

