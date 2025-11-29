import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { Button } from '../common/Button'
import { FormInput } from '../common/FormInput'

const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  'http://localhost:5000'

export default function JoinClassForm({ onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { user } = useUser()
  const [previousClassrooms, setPreviousClassrooms] = useState([])
  const [loadingPrevious, setLoadingPrevious] = useState(false)

  useEffect(() => {
    const fetchPreviousClassrooms = async () => {
      if (!user?.id) return
      
      setLoadingPrevious(true)
      try {
        const response = await axios.get(`${API_URL}/classrooms/user/${user.id}`)
        setPreviousClassrooms(response.data || [])
      } catch (error) {
        console.error('Error fetching previous classrooms:', error)
        setPreviousClassrooms([])
      } finally {
        setLoadingPrevious(false)
      }
    }

    fetchPreviousClassrooms()
  }, [user?.id])

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  const handleRejoinClassroom = (classroom) => {
    onSubmit({
      classCode: classroom.classCode,
    })
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormInput
          label="Class Code"
          name="classCode"
          register={register('classCode', {
            required: 'Class code is required',
            pattern: {
              value: /^[A-Za-z0-9]+$/,
              message: 'Class code must be alphanumeric only'
            }
          })}
          errors={errors}
          placeholder="e.g., ABC123"
          required
        />

        <div className="pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Joining...' : 'Join Classroom'}
          </Button>
        </div>
      </form>

      {/* Previously Joined Classrooms Section */}
      {previousClassrooms.length > 0 && (
        <div className="pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Previously Joined Classrooms
          </h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {loadingPrevious ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              previousClassrooms.map((classroom) => (
                <button
                  key={classroom._id}
                  type="button"
                  onClick={() => handleRejoinClassroom(classroom)}
                  disabled={isLoading}
                  className="w-full text-left p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {classroom.classroomName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {classroom.institutionName}
                        {classroom.departmentName && ` • ${classroom.departmentName}`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Code: <span className="font-mono">{classroom.classCode}</span>
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground">
                        Click to rejoin
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

