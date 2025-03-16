import { type VariantProps } from 'class-variance-authority'
import { useTranslation } from 'react-i18next'

import { CreditCard } from '@/components/svg/credit-card'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { Image } from '@/components/ui/image'
import { Skeleton } from '@/components/ui/skeleton'

export interface ResultBagdeProps {
  variant?: VariantProps<typeof badgeVariants>['variant']
  children: React.ReactNode
}

export interface ResultProps {
  id: string
  title: string
  imageUrl: string
  percentages: ResultBagdeProps[]
  details: ResultBagdeProps[]
  remarks?: string
}

export function Result({ id, imageUrl, title, percentages, details, remarks }: ResultProps) {
  const { t } = useTranslation()

  return (
    <div className="rounded-md border px-2 py-2 flex flex-col bg-card">
      <div className="flex items-center px-1 space-x-4">
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
      <div className="h-4" />
      <div className="flex flex-wrap gap-1">
        {details.map((detail, index) => (
          <Badge key={index} variant={detail.variant ?? 'secondary'}>
            {detail.children}
          </Badge>
        ))}
      </div>
      {(remarks || t(`rebates:${id}.remarks`, '')) && (
        <div className="text-sm font-condensed text-muted-foreground px-2 pt-2">
          {remarks || t(`rebates:${id}.remarks`)}
        </div>
      )}
    </div>
  )
}

export function EmptyResult() {
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

interface ResultListProps {
  results: ResultProps[] | undefined
}

export function ResultList({ results }: ResultListProps) {
  return (
    <div className="space-y-2">
      {!results || results.length === 0
        ? Array.from({ length: 3 }).map((_, index) => <EmptyResult key={index} />)
        : results.map((result, index) => <Result key={index} {...result} />)}
    </div>
  )
}
