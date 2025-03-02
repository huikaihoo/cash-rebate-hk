import { FilterOptions } from '@/components/card/filter'
import { Service } from '@/models/basic'
import { sleep } from '@/lib/utils'

const filterOptions: FilterOptions = {
  categories: [
    { value: 'any', label: '(Any)' },
    { value: 'supermarket', label: 'Supermarket' },
    { value: 'departmentStore', label: 'Department Store' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'electronicAppliance', label: 'Electronic Appliance' },
    { value: 'travel', label: 'Travel' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'entertainment', label: 'Entertainment' },
  ],
  shops: [
    { value: 'mcdonalds', label: "麥當勞 McDonald's" },
    { value: 'kfc', label: '肯德基 KFC' },
    { value: 'starbucks', label: '星巴克 Starbucks' },
    { value: 'aeon', label: '永旺 AEON' },
    { value: 'uniqlo', label: '優衣庫 UNIQLO' },
    { value: 'watsons', label: '屈臣氏 Watsons' },
    { value: 'mannings', label: '萬寧 Mannings' },
    { value: 'parknshop', label: '百佳 PARKnSHOP' },
    { value: 'wellcome', label: '惠康 Wellcome' },
    { value: '7eleven', label: '7-Eleven' },
    { value: 'circlek', label: 'OK 便利店 Circle K' },
  ],
  locations: [
    { value: 'cn', label: '🇨🇳 中國內地 Mainland China' },
    { value: 'mo', label: '🇲🇴 澳門 Macau' },
    { value: 'tw', label: '🇹🇼 台灣 Taiwan' },
    { value: 'jp', label: '🇯🇵 日本 Japan' },
    { value: 'kr', label: '🇰🇷 韓國 South Korea' },
    { value: 'th', label: '🇹🇭 泰國 Thailand' },
    { value: 'sg', label: '🇸🇬 新加坡 Singapore' },
    { value: 'my', label: '🇲🇾 馬來西亞 Malaysia' },
    { value: 'uk', label: '🇬🇧 英國 United Kingdom' },
    { value: 'eea', label: '🇪🇺 歐洲經濟區 Europe (EEA)' },
    { value: 'us', label: '🇺🇸 美國 United States' },
    { value: 'ca', label: '🇨🇦 加拿大 Canada' },
    { value: 'au', label: '🇦🇺 澳洲 Australia' },
    { value: 'nz', label: '🇳🇿 紐西蘭 New Zealand' },
    { value: 'others', label: '🌏 其他 Others' },
  ],
}

export class OptionService implements Service<FilterOptions> {
  getDefaultData(): FilterOptions {
    return { categories: [{ value: 'any', label: '(Any)' }], shops: [], locations: [] }
  }

  async getData(): Promise<FilterOptions> {
    // TODO: Get filter options from API
    await sleep(2000) // simulate API call
    return filterOptions as FilterOptions
  }
}
