import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app.tsx'
import '@/index.css'
import TopNavBar from './top-nav-bar.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TopNavBar />
      <App className="max-w-[840px] mx-auto p-4" />
    </ThemeProvider>
  </StrictMode>,
)
