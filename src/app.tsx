import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import '@/index.css'
import Header from '@/components/header'
import { PageTitle } from '@/components/page-title'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import i18n from '@/lib/i18n'
import HomePage from '@/pages/home/home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PageTitle />
        <Header />
        <HomePage />
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>,
)
