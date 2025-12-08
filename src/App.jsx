import { RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark, light } from '@clerk/themes'
import router from './router/routes'
import { ThemeProvider, useTheme } from './components/theme-provider'
import './index.css'

// Get Clerk publishable key from environment variables
// For Vite: VITE_CLERK_PUBLISHABLE_KEY
// For CRA: REACT_APP_CLERK_PUBLISHABLE_KEY
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!clerkPubKey) {
  console.error('Missing Clerk Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file')
}

// IMPORTANT: To change Google OAuth popup from "Clerk" to "Acadex":
// 1. Go to Clerk Dashboard → Configure → Application
// 2. Change "Application name" from "Clerk" to "Acadex"
// 3. Optionally add Privacy Policy & Terms of Service URLs
// See CLERK_BRANDING_SETUP.md for detailed instructions

// ClerkProvider wrapper that uses theme
function ClerkProviderWithTheme({ children }) {
  const { theme } = useTheme()

  // Determine current theme (handle "system" by checking prefers-color-scheme)
  const getCurrentTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  const currentTheme = getCurrentTheme()
  const isDark = currentTheme === 'dark'

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: isDark ? dark : light,
        elements: {
          footer: 'hidden',
          footerText: 'hidden',
          headerTitle: 'hidden',
          headerSubtitle: 'hidden',
        },
        layout: {
          unsafe_disableDevelopmentModeWarnings: true, // Hide "Development mode" text
          socialButtonsPlacement: 'top',
        },
        variables: {
          colorPrimary: 'hsl(45, 89%, 51%)', // Acadex golden color
          colorText: isDark ? 'hsl(0, 0%, 96%)' : 'hsl(0, 0%, 10%)',
          colorBackground: isDark ? 'hsl(0, 0%, 11%)' : 'hsl(0, 0%, 100%)',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ClerkProviderWithTheme>
        <RouterProvider router={router} />
      </ClerkProviderWithTheme>
    </ThemeProvider>
  )
}
