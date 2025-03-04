import { TriangleAlert, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterCard, FilterOptions, FilterValue } from '@/components/card/filter'
import { ResultCardList, ResultCardProps } from '@/components/card/result'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useService } from '@/hooks/use-service'
import { CreditCardService } from '@/services/credit-card'
import { OptionService } from '@/services/option'

function App() {
  const optionService = new OptionService()
  const creditCardService = new CreditCardService()

  const { t } = useTranslation()
  const { data: filterOptions, loading: optionsLoading } = useService<FilterOptions>(optionService)
  const { data: cardList } = useService<ResultCardProps[]>(creditCardService)

  const [showWarning, setShowWarning] = useState(true) // TODO: Use local storage to persist this state
  const [selectedTab, setSelectedTab] = useLocalStorage<string>('selectedTab', 'local')
  const [filterValue, setFilterValue] = useState<FilterValue>({
    category: optionService.getDefaultData().categories[0],
    shop: null,
    location: null,
    currency: 'local',
    amount: 0,
  })

  return (
    <div className="max-w-[840px] mx-auto p-4">
      {showWarning && (
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>{t('disclaimer.title')}</AlertTitle>
          <AlertDescription className="text-xs">{t('disclaimer.content')}</AlertDescription>
          <button className="absolute top-2.5 right-2.5" onClick={() => setShowWarning(false)}>
            <X className="h-4 w-4 shrink-0" />
          </button>
        </Alert>
      )}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsContent className="space-y-2" value="online">
          <ResultCardList results={cardList} />
          <FilterCard
            type="online"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
            loading={optionsLoading}
          />
        </TabsContent>
        <TabsContent className="space-y-2" value="local">
          <ResultCardList results={cardList} />
          <FilterCard
            type="local"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
            loading={optionsLoading}
          />
        </TabsContent>
        <TabsContent className="space-y-2" value="overseas">
          <ResultCardList results={cardList} />
          <FilterCard
            type="overseas"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
            loading={optionsLoading}
          />
        </TabsContent>
        <br />
        <TabsList className="grid w-full grid-cols-3 sticky bottom-2">
          <TabsTrigger
            className="data-[state=active]:bg-color-orange data-[state=active]:text-destructive-foreground"
            value="online"
          >
            {t('type.online')}
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-color-green data-[state=active]:text-destructive-foreground"
            value="local"
          >
            {t('type.local')}
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-color-blue data-[state=active]:text-destructive-foreground"
            value="overseas"
          >
            {t('type.overseas')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default App
