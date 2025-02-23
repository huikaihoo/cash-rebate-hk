import { Button } from '@/components/ui/button'
import { Github, Settings } from 'lucide-react'

function TopNavBar() {
  return (
    <div className="sticky top-0 z-50 bg-background shadow-md flex items-center justify-between px-4 x:px-40 py-4 border-b">
      <a href="/" className="text-lg font-semibold md:text-xl no-underline">
        HK Cash Rebate Calculator
      </a>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com/huikaihoo" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </div>
    </div>
  )
}

export default TopNavBar
