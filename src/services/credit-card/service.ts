import { ResultCardProps } from '@/components/card/result'
import api from '@/lib/api'
import { coreDb, resetTable } from '@/lib/db'
import { Service } from '@/lib/types'
import { CreditCard, Rebate, RebateIndex } from '@/services/credit-card/model'

export class CreditCardService implements Service<ResultCardProps[]> {
  getDefaultData(): ResultCardProps[] {
    return []
  }

  async getData(): Promise<ResultCardProps[]> {
    try {
      const [{ data: cards }, { data: rebates }, { data: rebateIndexes }] = await Promise.all([
        api.get<CreditCard[]>('/credit-cards.json'),
        api.get<Rebate[]>('/rebates.json'),
        api.get<RebateIndex[]>('/rebate-indexes.json'),
      ])
      console.log(cards)
      console.log(rebates)
      console.log(rebateIndexes)
      await coreDb.creditCardTrx('rw', async () => {
        resetTable(coreDb.creditCards, cards)
        resetTable(coreDb.rebates, rebates)
        resetTable(coreDb.rebateIndexes, rebateIndexes)
        await coreDb.metadata.put({ key: 'credit-card', checksum: '', updatedAt: new Date() })
      })
      return []
    } catch (error) {
      console.error('Failed to fetch credit card data:', error)
      return this.getDefaultData()
    }
  }
}
