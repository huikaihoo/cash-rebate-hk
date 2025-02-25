import { ResultCardProps } from '@/components/card/result'
import { Service } from '@/models/basic'
import { sleep } from '@/lib/utils'

const cardList: ResultCardProps[] = [
  {
    imageUrl: '',
    title: 'Hang Seng Travel+ Visa Signature Card',
    badges: [
      { variant: 'overseas', text: '7%' },
      { variant: 'secondary', text: '5%' },
      { variant: 'secondary', text: '0.4%' },
    ],
    details: ['Min: $6,000/mo', 'Max: $7,142/mo', 'Until: 2025-12-31'],
  },
  {
    imageUrl:
      'https://www.dbs.com.hk/iwov-resources/images/creditcards/eminent-card/emiplat-cardface-160x100.jpg',
    title: 'DBS Eminent Visa Platinum Card',
    badges: [
      { variant: 'physical', text: '5%' },
      { variant: 'secondary', text: '1%' },
      { variant: 'secondary', text: '0%' },
    ],
    details: ['Min: $300/pay', 'Max: $4,000/mo', 'Until: 2025-12-31'],
  },
  {
    imageUrl: 'https://cdn.hongkongcard.com/img/2019/09/forum/20190915225206_5d7e5016b8ddb.jpg',
    title: 'HSBC Red Credit Card',
    badges: [
      { variant: 'online', text: '4%' },
      { variant: 'secondary', text: '1%' },
      { variant: 'destructive', text: 'CBF -1%' },
    ],
    details: ['Min: N/A', 'Max: $10,000/mo', 'Until: 2025-06-30'],
  },
]

export class CreditCardService implements Service<ResultCardProps[]> {
  getDefaultData(): ResultCardProps[] {
    return []
  }
  async getData(): Promise<ResultCardProps[]> {
    // TODO: Get credit cards from API
    await sleep(500) // simulate API call
    return cardList
  }
}
