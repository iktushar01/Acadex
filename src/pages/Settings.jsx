import { useEffect, useMemo, useState } from 'react'
import { useUser, useClerk, SignInButton } from '@clerk/clerk-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { Avatar } from '@/components/common/Avatar'
import { useTheme } from '@/components/theme-provider'
import { Moon, Sun, LogOut, Save } from 'lucide-react'
import ClerkUsers from '@/components/ClerkUsers'

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const { user, isLoaded, isSignedIn } = useUser()
  const { openUserProfile, signOut } = useClerk()

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
  })
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [status, setStatus] = useState(null)

  const clerkCreatedDate = useMemo(() => {
    if (!user?.createdAt) return null
    return new Date(user.createdAt)
  }, [user])

  const lastSignInDate = useMemo(() => {
    if (!user?.lastSignInAt) return null
    return new Date(user.lastSignInAt)
  }, [user])

  useEffect(() => {
    if (isLoaded && user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        bio: user.publicMetadata?.bio || '',
      })
      setPreferences({
        emailNotifications:
          user.publicMetadata?.emailNotifications === undefined
            ? true
            : Boolean(user.publicMetadata?.emailNotifications),
        pushNotifications:
          user.publicMetadata?.pushNotifications === undefined
            ? true
            : Boolean(user.publicMetadata?.pushNotifications),
      })
    }
  }, [isLoaded, user])

  const handleProfileChange = (field) => (event) => {
    const value = event.target.value
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceToggle = (field) => (event) => {
    const { checked } = event.target
    setPreferences((prev) => ({ ...prev, [field]: checked }))
  }

  const handleSave = async () => {
    if (!user) return
    setIsSaving(true)
    setStatus(null)
    try {
      await user.update({
        firstName: profile.firstName,
        lastName: profile.lastName,
        publicMetadata: {
          ...user.publicMetadata,
          bio: profile.bio,
          emailNotifications: preferences.emailNotifications,
          pushNotifications: preferences.pushNotifications,
        },
      })
      setStatus({ type: 'success', message: 'Profile updated successfully.' })
    } catch (error) {
      console.error('Failed to save settings', error)
      setStatus({ type: 'error', message: 'Could not save changes. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!user) return
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete your account? This action cannot be undone.'
    )
    if (!confirmed) return

    setIsDeleting(true)
    setStatus(null)
    try {
      await user.delete()
      await signOut({ redirectUrl: '/' })
    } catch (error) {
      console.error('Failed to delete account', error)
      setStatus({
        type: 'error',
        message: 'Unable to delete the account right now. Please contact support if this persists.',
      })
      setIsDeleting(false)
    }
  }

  const avatarFallback = useMemo(() => {
    const firstInitial = profile.firstName?.charAt(0) || user?.firstName?.charAt(0) || ''
    const lastInitial = profile.lastName?.charAt(0) || user?.lastName?.charAt(0) || ''
    const initials = `${firstInitial}${lastInitial}`.trim().toUpperCase()
    if (initials) return initials

    const usernameFragment = user?.username?.slice(0, 2).toUpperCase()
    if (usernameFragment) return usernameFragment

    const emailFragment = profile.email?.slice(0, 2).toUpperCase()
    if (emailFragment) return emailFragment

    return 'JD'
  }, [profile.firstName, profile.lastName, profile.email, user?.firstName, user?.lastName, user?.username])

  const formatDate = (date) => {
    if (!date) return 'Unknown'
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
  }

  const formatRelativeTime = (date) => {
    if (!date) return 'Not recorded'
    const diffMs = Date.now() - date.getTime()
    const diffMinutes = Math.round(diffMs / (1000 * 60))
    if (diffMinutes < 1) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
    const diffHours = Math.round(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
    const diffDays = Math.round(diffHours / 24)
    if (diffDays < 30) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
    const diffMonths = Math.round(diffDays / 30)
    if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`
    const diffYears = Math.round(diffMonths / 12)
    return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`
  }

  if (!isLoaded) {
    return (
      <div className="space-y-6 max-w-3xl">
        <Card>
          <CardContent className="p-6 text-muted-foreground">Loading your settings...</CardContent>
        </Card>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Sign in required</CardTitle>
            <CardDescription>Access your account settings after signing in.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton mode="modal">
              <Button>Sign in to continue</Button>
            </SignInButton>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-linear-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-xl">
        <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={user?.imageUrl || ''}
              fallback={avatarFallback}
              className="h-24 w-24 border-4 border-white/60 bg-white/20"
            />
            <div>
              <p className="text-sm uppercase tracking-wide text-primary-foreground/80">
                Signed in with Acadex
              </p>
              <h1 className="text-3xl font-semibold">{profile.firstName || profile.lastName ? `${profile.firstName} ${profile.lastName}`.trim() : user?.username || 'Student'}</h1>
              <p className="text-primary-foreground/80">
                {profile.email}{' '}
                {user?.username && (
                  <span className="text-primary-foreground/60">• @{user.username}</span>
                )}
              </p>
              <p className="text-sm text-primary-foreground/70">
                Member since {formatDate(clerkCreatedDate)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="bg-white/10 text-white" onClick={() => openUserProfile?.({})}>
              Manage profile
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 text-white"
              onClick={() => signOut({ redirectUrl: '/' })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-primary/30 bg-primary/20 p-6 text-white/90 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/70">Last active</p>
            <p className="text-lg font-semibold">{formatRelativeTime(lastSignInDate)}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-white/70">Two-factor auth</p>
            <p className="text-lg font-semibold">
              {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-white/70">Email status</p>
            <p className="text-lg font-semibold">
              {user?.primaryEmailAddress?.verification?.status === 'verified'
                ? 'Verified'
                : 'Pending verification'}
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-white/70">Account ID</p>
            <p className="text-lg font-semibold truncate">{user?.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile details</CardTitle>
            <CardDescription>Keep your name, bio, and personal information up to date.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">First name</label>
                <div className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
                  {profile.firstName || '—'}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Last name</label>
                <div className="rounded-2xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
                  {profile.lastName || '—'}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Names are synced from your Acadex account. Use the "Manage profile" button to edit them.
            </p>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input type="email" value={profile.email} readOnly disabled />
              <p className="text-xs text-muted-foreground mt-1">
                Managed by Acadex. Update from the profile settings.
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Bio</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Tell the community about your study goals, interests, or expertise."
                value={profile.bio}
                onChange={handleProfileChange('bio')}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save profile'}
              </Button>
              {status && (
                <p
                  className={`text-sm ${
                    status.type === 'success' ? 'text-emerald-600' : 'text-destructive'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account security</CardTitle>
            <CardDescription>Overview of your authentication status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Two-factor authentication</p>
              <p className="text-lg font-semibold text-foreground">
                {user?.twoFactorEnabled ? 'Enabled' : 'Not enabled'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {user?.twoFactorEnabled
                  ? 'Your account is protected with an additional verification step.'
                  : 'Set up 2FA in your account settings to add another layer of security.'}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Last sign in</p>
              <p className="text-lg font-semibold text-foreground">
                {formatRelativeTime(lastSignInDate)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {lastSignInDate ? formatDate(lastSignInDate) : 'No recent activity recorded.'}
              </p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => openUserProfile?.({})}>
              Open security settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interface preferences</CardTitle>
            <CardDescription>Control how Acadex looks and how we contact you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark experiences.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={theme === 'light' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === 'dark' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div>
                <p className="font-medium">Email updates</p>
                <p className="text-sm text-muted-foreground">
                  Announcements, study tips, and product news.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={handlePreferenceToggle('emailNotifications')}
                className="h-5 w-10 rounded-full border-input accent-primary"
              />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div>
                <p className="font-medium">Push notifications</p>
                <p className="text-sm text-muted-foreground">
                  Alerts about shared notes and classmate invites.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.pushNotifications}
                onChange={handlePreferenceToggle('pushNotifications')}
                className="h-5 w-10 rounded-full border-input accent-primary"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Danger zone</CardTitle>
            <CardDescription>Irreversible actions for your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-destructive/40 p-4">
              <p className="font-medium text-destructive">Delete account</p>
              <p className="text-sm text-muted-foreground">
                Permanently removes your notes, classes, and activity. This cannot be undone.
              </p>
              <Button
                variant="destructive"
                className="mt-4"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete my account'}
              </Button>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="font-medium">Export your data</p>
              <p className="text-sm text-muted-foreground">
                Reach out to support@acadex.com to request an export before deleting your profile.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ClerkUsers />
    </div>
  )
}