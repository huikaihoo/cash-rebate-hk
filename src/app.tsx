import { useLiveQuery } from 'dexie-react-hooks'
import _ from 'lodash'
import { TriangleAlert, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterCard, FilterOptions, FilterValue } from '@/components/card/filter'
import { ResultCardList, ResultCardProps } from '@/components/card/result'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useService } from '@/hooks/use-service'
import { coreDb, joinTables } from '@/lib/db'
import i18n from '@/lib/i18n'
import {
  filterRebate,
  filterToChannel,
  rebateToResultCardProps,
} from '@/services/credit-card/logic'
import { RebateWithCard } from '@/services/credit-card/model'
import { CreditCardService } from '@/services/credit-card/service'
import { OptionService } from '@/services/option/service'

function App() {
  const optionService = new OptionService()
  const creditCardService = new CreditCardService()

  const { t } = useTranslation()
  const { data: filterOptions, loading: optionsLoading } = useService<FilterOptions>(optionService)
  useService<ResultCardProps[]>(creditCardService)

  const [showWarning, setShowWarning] = useState(true) // TODO: Use local storage to persist this state
  const [selectedTab, setSelectedTab] = useLocalStorage<string>('selectedTab', 'local')
  const [filterValue, setFilterValue] = useLocalStorage<FilterValue>('filterValue', {
    category: optionService.getDefaultData().categories[0],
    shop: null,
    location: null,
    currency: 'local',
    amount: 0,
  })

  const rebateList = useLiveQuery(async () => {
    const channel = filterToChannel(selectedTab, filterValue.currency)

    return await coreDb.creditCardTrx('r', async () => {
      const rebateList = await coreDb.rebates
        .where('channels')
        .equals(channel)
        .reverse()
        .sortBy('percentage')

      return await joinTables(
        rebateList,
        [{ target: coreDb.creditCards, getKey: (rebate) => rebate.cardId }],
        (targets, rebate) => ({ ...rebate, card: targets[0] }) as RebateWithCard,
      )
    })
  }, [selectedTab, filterValue.currency])

  const results = useMemo(() => {
    if (!rebateList) return []
    return _.chain(rebateList)
      .filter((rebate) => filterRebate(rebate, filterValue, selectedTab))
      .uniqBy('cardId')
      .map((rebate) => rebateToResultCardProps(rebate, selectedTab, filterValue, t))
      .value()
  }, [t, selectedTab, filterValue, rebateList])

  return (
    <div className="max-w-[840px] mx-auto p-4" key={i18n.resolvedLanguage}>
      {showWarning && (
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle className="font-semibold">{t('disclaimer.title')}</AlertTitle>
          <AlertDescription className="text-xs">{t('disclaimer.content')}</AlertDescription>
          <button className="absolute top-2.5 right-2.5" onClick={() => setShowWarning(false)}>
            <X className="h-4 w-4 shrink-0" />
          </button>
        </Alert>
      )}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsContent className="space-y-4" value="online">
          <ResultCardList results={results} />
          <FilterCard
            type="online"
            // className="bg-color-orange"
            // labelClassName="text-destructive-foreground"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
            loading={optionsLoading}
          />
        </TabsContent>
        <TabsContent className="space-y-4" value="local">
          <ResultCardList results={results} />
          <FilterCard
            type="local"
            // className="bg-color-green"
            // labelClassName="text-destructive-foreground"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
            loading={optionsLoading}
          />
        </TabsContent>
        <TabsContent className="space-y-4" value="overseas">
          <ResultCardList results={results} />
          <FilterCard
            type="overseas"
            // className="bg-color-blue"
            // labelClassName="text-destructive-foreground"
            options={filterOptions}
            value={filterValue}
            setValue={setFilterValue}
            loading={optionsLoading}
          />
        </TabsContent>
        <div className="h-4" />
        <TabsList className="grid w-full grid-cols-3 sticky bottom-4">
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
