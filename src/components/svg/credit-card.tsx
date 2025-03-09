import { SvgProps } from '@/lib/types'
import { cn } from '@/lib/utils'

export function CreditCard({ className, ...props }: SvgProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 96 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      className={cn('text-gray-400 flex-shrink-0', className)}
      {...props}
    >
      <rect width="90" height="56" x="3" y="2" rx="4" />
      <line x1="3" x2="93" y1="18" y2="18" strokeWidth="10" />
      <line x1="15" x2="55" y1="34" y2="34" strokeLinecap="round" />
      <line x1="15" x2="25" y1="42" y2="42" strokeLinecap="round" />
      <line x1="30" x2="40" y1="42" y2="42" strokeLinecap="round" />
      <circle cx="76" cy="38" r="6" fill="currentColor" />
    </svg>
  )
}
