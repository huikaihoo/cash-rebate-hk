import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeProvider } from '@/components/theme-provider'
import { FilterCard, FilterOptions, FilterValue } from '@/components/card/filter'
import { ResultCardList, ResultCardProps } from '@/components/card/result'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TriangleAlert } from 'lucide-react'

const filterOptions: FilterOptions = {
  categories: [
    { value: 'any', label: '(Any)' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'supermarket', label: 'Supermarket' },
    { value: 'hotel', label: 'Hotel' },
  ],
  names: [
    { value: 'mcdonalds', label: 'McDonalds' },
    { value: 'kfc', label: 'KFC' },
    { value: 'aeon', label: 'AEON' },
  ],
  locations: [
    { value: 'jp', label: '🇯🇵 Japan' },
    { value: 'tw', label: '🇹🇼 Taiwan' },
  ],
}

const cardList: ResultCardProps[] = [
  {
    imageUrl: '',
    title: 'Hang Seng Travel+ Visa Signature Card',
    badges: [
      { variant: 'default', text: '7%' },
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
      { variant: 'default', text: '5%' },
      { variant: 'secondary', text: '1%' },
      { variant: 'secondary', text: '0%' },
    ],
    details: ['Min: $300/pay', 'Max: $4,000/mo', 'Until: 2025-12-31'],
  },
  {
    imageUrl: 'https://cdn.hongkongcard.com/img/2019/09/forum/20190915225206_5d7e5016b8ddb.jpg',
    title: 'HSBC Red Credit Card',
    badges: [
      { variant: 'default', text: '4%' },
      { variant: 'secondary', text: '1%' },
      { variant: 'destructive', text: 'CBF -1%' },
    ],
    details: ['Min: N/A', 'Max: $10,000/mo', 'Until: 2025-06-30'],
  },
]

function App() {
  // const [count, setCount] = useState(0)
  const [filterValue, setFilterValue] = useState<FilterValue>({
    category: filterOptions.categories[0],
    name: null,
    location: null,
    amount: 0,
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button> */}
      <Alert>
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          The results are for reference only. Please refer to official documents for details. No
          legal responsibility is assumed for any errors, omissions, or damages arising from the
          use, inability to use, or reliance on this information.
          結果僅供參考，詳情請參閱官方文件。對於任何錯誤、遺漏，或因使用、無法使用或依賴該資訊而引起的損害，概不承擔法律責任。
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="online" className="w-full">
        <TabsContent className="space-y-2" value="online">
          <ResultCardList results={cardList} />
          <FilterCard
            type="online"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
          />
        </TabsContent>
        <TabsContent className="space-y-2" value="physical">
          <ResultCardList results={cardList} />
          <FilterCard
            type="physical"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
          />
        </TabsContent>
        <TabsContent className="space-y-2" value="overseas">
          <ResultCardList results={cardList} />
          <FilterCard
            type="overseas"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
          />
        </TabsContent>
        <br />
        <TabsList className="grid w-full grid-cols-3 sticky bottom-2">
          <TabsTrigger value="online">Online</TabsTrigger>
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="overseas">Overseas</TabsTrigger>
        </TabsList>
      </Tabs>
    </ThemeProvider>
  )
}

export default App
