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
        layout: {
          unsafe_disableDevelopmentModeWarnings: true, // Hide "Development mode" text
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
