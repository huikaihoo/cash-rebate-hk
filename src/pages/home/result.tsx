import { type VariantProps } from 'class-variance-authority'

import { CreditCard } from '@/components/svg/credit-card'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { Image } from '@/components/ui/image'
import { Skeleton } from '@/components/ui/skeleton'

export interface ResultCardBagdeProps {
  variant?: VariantProps<typeof badgeVariants>['variant']
  children: React.ReactNode
}

export interface ResultCardProps {
  title: string
  imageUrl: string
  percentages: ResultCardBagdeProps[]
  details: ResultCardBagdeProps[]
  remarks?: string
}

export function ResultCard({ imageUrl, title, percentages, details, remarks }: ResultCardProps) {
  return (
    <div className="rounded-md border px-2 py-2 flex flex-col space-y-4 bg-card">
      <div className="flex items-center space-x-4">
        <Image
          src={imageUrl}
          alt={title}
          className="w-[96px] h-[60px] rounded object-cover aspect-[1.6]"
        >
          <CreditCard />
        </Image>
        <div className="flex flex-col space-y-2">
          <div className="font-condensed font-semibold">{title}</div>
          <div className="flex h-5 items-center space-x-2">
            {percentages.map((percentage, index) => (
              <Badge key={index} variant={percentage.variant ?? 'secondary'}>
                {percentage.children}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {details.map((detail, index) => (
          <Badge key={index} variant={detail.variant ?? 'secondary'}>
            {detail.children}
          </Badge>
        ))}
      </div>
      {remarks && <div className="text-sm text-stone-500">{remarks}</div>}
    </div>
  )
}

export function ResultCardEmpty() {
  return (
    <div className="rounded-md border px-2 py-2 flex flex-col space-y-4 bg-card">
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
  results: ResultCardProps[] | undefined
}

export function ResultCardList({ results }: ResultCardListProps) {
  return (
    <div className="space-y-2">
      {!results || results.length === 0
        ? Array.from({ length: 3 }).map((_, index) => <ResultCardEmpty key={index} />)
        : results.map((result, index) => <ResultCard key={index} {...result} />)}
    </div>
  )
}
