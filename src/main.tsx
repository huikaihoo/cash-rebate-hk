import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app.tsx'
import '@/index.css'
import TopNavBar from './top-nav-bar.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n'
import { PageTitle } from '@/components/page-title'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PageTitle />
        <TopNavBar />
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>,
)
