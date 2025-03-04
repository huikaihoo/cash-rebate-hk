import { CreditCard } from '@/components/image/credit-card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export interface ResultCardProps {
  title: string
  imageUrl: string
  badges: {
    variant: 'default' | 'secondary' | 'destructive' | 'online' | 'local' | 'overseas' | 'outline'
    text: string
  }[]
  details: string[]
}

export function ResultCard({ imageUrl, title, badges, details }: ResultCardProps) {
  return (
    <div className="rounded-md border px-4 py-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        {imageUrl ? (
          <img className="w-[96px] h-[60px] object-cover aspect-[1.6]" src={imageUrl} alt={title} />
        ) : (
          <CreditCard className="w-[96px] h-[60px] object-cover aspect-[1.6]" />
        )}
        <div className="flex flex-col space-y-2">
          <div className="font-semibold">{title}</div>
          <div className="flex h-5 items-center space-x-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant={badge.variant}>
                {badge.text}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {details.map((detail, index) => (
          <Badge key={index} variant="secondary">
            {detail}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function ResultCardEmpty() {
  return (
    <div className="rounded-md border px-4 py-4 flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-[96px] h-[60px] rounded object-cover aspect-[1.6]" />
        <div className="flex flex-col space-y-2 flex-1">
          <Skeleton className="h-6 w-6/7 max-w-64 rounded" />
          <div className="flex h-5 items-center space-x-2">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
    </div>
  )
}

interface ResultCardListProps {
  results: ResultCardProps[]
}

export function ResultCardList({ results }: ResultCardListProps) {
  return (
    <div className="space-y-2">
      {results.length === 0
        ? Array.from({ length: 3 }).map((_, index) => <ResultCardEmpty key={index} />)
        : results.map((result, index) => <ResultCard key={index} {...result} />)}
    </div>
  )
}
