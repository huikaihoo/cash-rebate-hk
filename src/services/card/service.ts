import api from '@/lib/api'
import { coreDb, resetTable } from '@/lib/db'
import { Service } from '@/lib/types'
import { ResultProps } from '@/pages/home/result'
import { Card, Rebate } from '@/services/card/model'

export class CardService implements Service<ResultProps[]> {
  getDefaultData(): ResultProps[] {
    return []
  }

  async getData(): Promise<ResultProps[]> {
    try {
      const [{ data: cards }, { data: rebates }] = await Promise.all([
        api.get<Card[]>('/cards.json'),
        api.get<Rebate[]>('/rebates.json'),
      ])
      console.log('cards', cards)
      console.log('rebates', rebates)

      await coreDb.cardTrx('rw', async () => {
        resetTable(coreDb.cards, cards)
        resetTable(coreDb.rebates, rebates)
        await coreDb.metadata.put({ key: 'card', checksum: '', updatedAt: new Date() })
      })
      return []
    } catch (error) {
      console.error('Failed to fetch card data:', error)
      return this.getDefaultData()
    }
  }
}
