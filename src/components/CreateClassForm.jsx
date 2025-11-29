import { useForm } from 'react-hook-form'
import { Button } from './common/Button'
import { FormInput } from './common/FormInput'
import { cn } from '@/lib/utils'

export default function CreateClassForm({ onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const institutionType = watch('institutionType')

  const generateClassCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 6; i += 1) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  const handleGenerateCode = () => {
    const code = generateClassCode()
    setValue('classCode', code, { shouldDirty: true, shouldValidate: true })
  }

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="institutionType" className="text-sm font-medium text-foreground">
          Institution Type <span className="text-destructive">*</span>
        </label>
        <select
          id="institutionType"
          {...register('institutionType', { required: 'Institution type is required' })}
          className={cn(
            'flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            errors.institutionType && 'border-destructive focus-visible:ring-destructive'
          )}
        >
          <option value="">Select institution type</option>
          <option value="University">University</option>
          <option value="School">School</option>
          <option value="College">College</option>
          <option value="Other">Other</option>
        </select>
        {errors.institutionType && (
          <p className="text-sm text-destructive mt-1">
            {errors.institutionType.message}
          </p>
        )}
      </div>

      <FormInput
        label="Institution Name"
        name="institutionName"
        register={register('institutionName', { required: 'Institution name is required' })}
        errors={errors}
        placeholder="e.g., Harvard University"
        required
      />

      {institutionType === 'University' && (
        <FormInput
          label="Department Name"
          name="departmentName"
          register={register('departmentName', {
            required: institutionType === 'University' ? 'Department name is required for University' : false
          })}
          errors={errors}
          placeholder="e.g., Computer Science"
          required
        />
      )}

      {(institutionType === 'School' || institutionType === 'College') && (
        <FormInput
          label="Class or Grade"
          name="classOrGrade"
          register={register('classOrGrade', {
            required: (institutionType === 'School' || institutionType === 'College') 
              ? 'Class or Grade is required' 
              : false
          })}
          errors={errors}
          placeholder="e.g., Grade 10 or Class A"
          required
        />
      )}

      <FormInput
        label="Section"
        name="section"
        register={register('section')}
        errors={errors}
        placeholder="e.g., Section A (optional)"
      />

      <FormInput
        label="Classroom Name"
        name="classroomName"
        register={register('classroomName', { required: 'Classroom name is required' })}
        errors={errors}
        placeholder="e.g., CS101 - Introduction to Programming"
        required
      />

      <div className="space-y-2">
        <label htmlFor="classCode" className="text-sm font-medium text-foreground">
          Class Code <span className="text-destructive">*</span>
        </label>
        <div className="flex gap-2">
          <FormInput
            label=""
            name="classCode"
            register={register('classCode', {
              required: 'Class code is required',
              pattern: {
                value: /^[A-Za-z0-9]{6}$/,
                message: 'Class code must be 6 characters (A-Z, 0-9)',
              },
            })}
            errors={errors}
            placeholder="e.g., ABC123"
            className="flex-1 cursor-default"
            readOnly
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="whitespace-nowrap h-10 px-3 text-xs sm:text-sm"
            onClick={handleGenerateCode}
          >
            Generate Code
          </Button>
        </div>
      </div>

      <FormInput
        label="Capacity"
        name="capacity"
        type="number"
        register={register('capacity', {
          valueAsNumber: true,
          validate: (value) => {
            if (value && (isNaN(value) || value < 1)) {
              return 'Capacity must be a positive number'
            }
            return true
          }
        })}
        errors={errors}
        placeholder="e.g., 30 (optional)"
      />

      <div className="pt-4">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Classroom'}
        </Button>
      </div>
    </form>
  )
}

