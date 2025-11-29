import { useState } from 'react'
import Modal from '@/ReuseableComponent/Modal'
import { Button } from '../common/Button'
import CreateClassForm from './CreateClassForm'
import JoinClassForm from './JoinClassForm'
import { cn } from '@/lib/utils'

export default function DashboardAccessModal({
  isOpen,
  onClose,
  onCreateClass,
  onJoinClass,
  initialTab = 'join',
}) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateClass = async (data) => {
    setIsLoading(true)
    try {
      await onCreateClass(data)
    } catch (error) {
      console.error('Error creating class:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinClass = async (data) => {
    setIsLoading(true)
    try {
      await onJoinClass(data)
    } catch (error) {
      console.error('Error joining class:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Access Dashboard"
      size="lg"
    >
      <div className="space-y-6">
        {/* Toggle Buttons */}
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('join')}
            className={cn(
              'flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all',
              activeTab === 'join'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Join Classroom
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={cn(
              'flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all',
              activeTab === 'create'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Create Classroom
          </button>
        </div>

        {/* Form Content */}
        <div className="min-h-[300px]">
          {activeTab === 'join' ? (
            <JoinClassForm 
              onSubmit={handleJoinClass} 
              isLoading={isLoading}
            />
          ) : (
            <CreateClassForm 
              onSubmit={handleCreateClass} 
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}

