import { Button } from '@/components/ui/button'
import { Github, Settings } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from './components/theme-provider'

function TopNavBar() {
  const [language, setLanguage] = useState<string>('en')
  const { theme, setTheme } = useTheme()

  return (
    <div className="sticky top-0 z-50 bg-primary shadow-md flex items-center justify-between px-4 x:px-40 py-2 border-b">
      <a href="/" className="text-lg font-semibold md:text-xl no-underline">
        Cash Rebate Calculator <sup className="align-top text-xs">HK</sup>
      </a>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLanguage(language == 'en' ? 'zh' : 'en')}
        >
          <div className="text-sm">{language === 'en' ? 'En' : '中'}</div>
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
