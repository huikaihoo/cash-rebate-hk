import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import App from '@/app.tsx'
import '@/index.css'
import { PageTitle } from '@/components/page-title'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import i18n from '@/lib/i18n'
import TopNavBar from '@/top-nav-bar'

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
