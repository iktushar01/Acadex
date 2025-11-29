import { useForm } from 'react-hook-form'
import { Button } from './common/Button'
import { FormInput } from './common/FormInput'

export default function JoinClassForm({ onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
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

      <FormInput
        label="Display Name"
        name="displayName"
        register={register('displayName')}
        errors={errors}
        placeholder="e.g., John Doe (optional)"
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
  )
}

