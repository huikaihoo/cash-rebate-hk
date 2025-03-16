import { useLiveQuery } from 'dexie-react-hooks'
import _ from 'lodash'
import { TriangleAlert, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useService } from '@/hooks/use-service'
import { coreDb, joinTables } from '@/lib/db'
import i18n from '@/lib/i18n'
import { Filter, FilterOptions, FilterValue } from '@/pages/home/filter'
import { ResultList, ResultProps } from '@/pages/home/result'
import { filterRebate, filterToChannel, rebateToResultCardProps } from '@/services/card/logic'
import { RebateWithCard } from '@/services/card/model'
import { CardService } from '@/services/card/service'
import { OptionService } from '@/services/option/service'

function HomePage() {
  const optionService = new OptionService()
  const cardService = new CardService()

  const { t } = useTranslation()
  const isWideScreen = !useMediaQuery('(max-width: 768px)')
  const { data: filterOptions, loading: optionsLoading } = useService<FilterOptions>(optionService)
  useService<ResultProps[]>(cardService)

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

    return await coreDb.cardTrx('r', async () => {
      const rebateList = await coreDb.rebates
        .where('channels')
        .equals(channel)
        .reverse()
        .sortBy('percentage')

      return await joinTables(
        rebateList,
        [{ target: coreDb.cards, getKey: (rebate) => rebate.cardId }],
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
    <div className="max-w-[840px] mx-auto p-2" key={i18n.resolvedLanguage}>
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
          <ResultList results={results} />
          <Filter
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
          <ResultList results={results} />
          <Filter
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
          <ResultList results={results} />
          <Filter
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
        <TabsList className="grid w-full grid-cols-3 fixed bottom-4 max-w-[calc(min(100%-1rem,824px))] z-10">
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
        <div className={isWideScreen ? 'h-10' : 'h-32'} />
      </Tabs>
      <div className="fixed bg-background bottom-0 left-0 right-0 h-8 z-0 mx-auto max-w-[840px]" />
    </div>
  )
}

export default HomePage
