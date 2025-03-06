import { Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Github } from '@/components/svg/github'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

function TopNavBar() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()

  const toggleLanguage = () => {
    const target = i18n.resolvedLanguage === 'en' ? 'zh' : 'en'
    i18n.changeLanguage(target)
  }

  return (
    <div className="sticky top-0 z-50 bg-primary shadow-md flex items-center justify-between px-2 x:px-40 py-2 border-b">
      <a href="/" className="flex items-center no-underline">
        <img src="icon_mono.svg" alt="logo" className="h-8 w-8 dark:invert" />
        <span className="font-condensed font-bold text-lg truncate">{t('title')}</span>
        &nbsp;<sup className="align-top text-base">🇭🇰</sup>
      </a>
      <div className="min-w-8" />
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" onClick={toggleLanguage}>
          <div className="text-sm font-semibold">
            {i18n.resolvedLanguage === 'en' ? '中' : 'En'}
          </div>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com/huikaihoo" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Settings />
        </Button>
      </div>
    </div>
  )
}

export default TopNavBar
