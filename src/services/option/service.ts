import api from '@/lib/api'
import { Service } from '@/lib/types'
import { FilterOptions } from '@/pages/home/filter'
import { Options } from '@/services/option/model'

function toTitle(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

export class OptionService implements Service<FilterOptions> {
  getDefaultData(): FilterOptions {
    return {
      categories: [
        { value: '+general', label: 'General' },
        { value: 'general', label: '(General)' },
      ],
      shops: [],
      locations: [],
    }
  }

  async getData(): Promise<FilterOptions> {
    try {
      const { data } = await api.get<Options>('/options.json')

      const defaultOptions = this.getDefaultData()
      const options: FilterOptions = {
        categories: [
          ...defaultOptions.categories,
          ...((data.categories as string[]) || []).map((category) => ({
            value: category,
            label: toTitle(category),
          })),
        ],
        shops: [
          ...defaultOptions.shops,
          ...((data.shops as [string, string, string[]][]) || []).map(([value, label, groups]) => ({
            value,
            label,
            groups,
          })),
        ],
        locations: [
          ...defaultOptions.locations,
          ...((data.locations as [string, string][]) || []).map(([value, label]) => ({
            value,
            label,
          })),
        ],
      }

      return options
    } catch (error) {
      console.error('Failed to fetch options: ', error)
      return this.getDefaultData()
    }
  }
}
