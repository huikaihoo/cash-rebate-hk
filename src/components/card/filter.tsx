'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { ComboboxResponsive } from '@/components/ui/combobox'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ListFilter } from 'lucide-react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Item } from '@/models/basic'
import { Trans, useTranslation } from 'react-i18next'

export interface FilterValue {
  category: Item | null
  shop: Item | null
  location: Item | null
  amount: number
}

export interface FilterOptions {
  categories: Item[]
  shops: Item[]
  locations: Item[]
}

export interface FilterContentProps {
  type: 'online' | 'local' | 'overseas'
  options: FilterOptions
  value: FilterValue
  setValue: React.Dispatch<React.SetStateAction<FilterValue>>
}

export function FilterCard({ type, value, options, setValue }: FilterContentProps) {
  const { t } = useTranslation()
  const [accordionState, setAccordionState] = useLocalStorage('filterAccordionState', 'filter')
  const { shops, categories, locations } = options

  return (
    <Accordion
      className="rounded-md border px-4 py-3 space-y-1"
      type="single"
      collapsible
      value={accordionState ?? undefined}
      onValueChange={(newState) => setAccordionState(newState)}
    >
      <AccordionItem value="filter">
        <AccordionTrigger>
          <div className="flex items-center space-x-4">
            <ListFilter /> <span>{t('filter.title')}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid w-full items-center gap-4 pt-4 px-2">
            {/* Shop Category */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="category">{t('filter.category')}</Label>
              <Select
                value={value.category?.value || ''}
                onValueChange={(newValue) => {
                  const newCategory = categories.find((cat) => cat.value === newValue) || null
                  setValue((prev) => ({ ...prev, category: newCategory }))
                }}
              >
                <SelectTrigger className="w-full justify-between">
                  <SelectValue placeholder={t('filter.category')}>
                    <Trans
                      i18nKey={`categories.${value.category?.value}`}
                      defaults={value.category?.label}
                    />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {categories.map((categoryItem) => (
                    <SelectItem key={categoryItem.value} value={categoryItem.value}>
                      <Trans
                        i18nKey={`categories.${categoryItem.value}`}
                        defaults={categoryItem.label}
                      />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditionally render Shop Name or Location */}
            {type === 'overseas' ? (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="location">{t('filter.location')}</Label>
                <ComboboxResponsive
                  options={locations}
                  placeholder={t('filter.placeholder.location')}
                  emptyText={t('filter.emptyText.location')}
                  item={value.location}
                  onItemChange={(newItem) => setValue((prev) => ({ ...prev, location: newItem }))}
                />
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">{t('filter.shop')}</Label>
                <ComboboxResponsive
                  options={shops}
                  placeholder={t('filter.placeholder.shop')}
                  emptyText={t('filter.emptyText.shop')}
                  item={value.shop}
                  onItemChange={(newItem) => setValue((prev) => ({ ...prev, shop: newItem }))}
                />
              </div>
            )}

            {/* Amount */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="amount">{t('filter.amount')}</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">HKD</Badge>
                <Input
                  id="amount"
                  type="number"
                  value={value.amount}
                  min="0"
                  step="10"
                  onChange={(e) =>
                    setValue((prev) => ({
                      ...prev,
                      amount: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
