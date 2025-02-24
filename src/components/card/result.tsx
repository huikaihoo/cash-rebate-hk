import { Badge } from '@/components/ui/badge'
import { CreditCard } from '@/components/image/credit-card'

export interface ResultCardProps {
  title: string
  imageUrl: string
  badges: {
    variant:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'online'
      | 'physical'
      | 'overseas'
      | 'outline'
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

interface ResultCardListProps {
  results: ResultCardProps[]
}

export function ResultCardList({ results }: ResultCardListProps) {
  return (
    <div className="space-y-2">
      {results.map((result, index) => (
        <ResultCard key={index} {...result} />
      ))}
    </div>
  )
}
