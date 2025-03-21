'use client'

import { ListFilter, X } from 'lucide-react'
import * as React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ComboboxResponsive } from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Item } from '@/lib/types'
import { cn } from '@/lib/utils'

export interface FilterValue {
  category: Item | undefined
  shop: Item | undefined
  location: Item | undefined
  currency: 'local' | 'foreign'
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
  loading: boolean
  className?: string
  labelClassName?: string
}

export function Filter({
  type,
  options,
  value,
  setValue,
  loading,
  className,
  labelClassName,
}: FilterContentProps) {
  const { t } = useTranslation()
  const [accordionState, setAccordionState] = useLocalStorage('filterAccordionState', 'filter')
  const { shops, categories, locations } = options

  return (
    <Accordion
      className={cn('rounded-md border px-4 bg-accent fixed bottom-[70px] right-4', className)}
      type="single"
      collapsible
      value={accordionState ?? undefined}
      onValueChange={(newState) => setAccordionState(newState)}
    >
      <AccordionItem value="filter">
        <AccordionTrigger className={cn(labelClassName, '[&[data-state=closed]>svg]:hidden')}>
          <div className="flex items-center space-x-4">
            <ListFilter />
            <span>{t('filter.title')}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="w-[calc(min(100vw-4rem,400px))]">
          <div className="grid items-center gap-4 pt-4 px-2">
            {/* Shop Category */}
            <div className="flex flex-col space-y-2">
              <Label className={labelClassName} htmlFor="category">
                {t('filter.category')}
              </Label>
              <Select
                value={value.category?.value || ''}
                onValueChange={(newValue) => {
                  const newCategory = categories.find((cat) => cat.value === newValue) || undefined
                  setValue((prev) => {
                    const isShopInCategory =
                      prev.shop && prev.shop.groups && prev.shop.groups.includes(newValue)
                    return {
                      ...prev,
                      category: newCategory,
                      shop: isShopInCategory ? prev.shop : undefined,
                    }
                  })
                }}
                disabled={loading}
              >
                <SelectTrigger className="w-full justify-between h-9">
                  <SelectValue placeholder={t('filter.category')}>
                    <Trans
                      i18nKey={[
                        `options:categories.${value.category?.value}`,
                        `categories.${value.category?.value}`,
                      ]}
                      defaults={value.category?.label}
                    />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {categories.reduce((acc, categoryItem, index) => {
                    if (index === 0 || categoryItem.value.startsWith('+')) {
                      // Start a new group
                      const nextGroupIndex = categories.findIndex(
                        (item, i) => i > index && item.value.startsWith('+'),
                      )
                      const groupEndIndex =
                        nextGroupIndex === -1 ? categories.length : nextGroupIndex

                      acc.push(
                        <SelectGroup key={categoryItem.value}>
                          <SelectLabel>
                            <Trans
                              i18nKey={[
                                `options:categories.${categoryItem.value}`,
                                `categories.${categoryItem.value}`,
                              ]}
                              defaults={categoryItem.label}
                            />
                          </SelectLabel>
                          {/* Add only items belonging to this group */}
                          {categories.slice(index + 1, groupEndIndex).map((subItem) => (
                            <SelectItem key={subItem.value} value={subItem.value} className="h-9">
                              <Trans
                                i18nKey={[
                                  `options:categories.${subItem.value}`,
                                  `categories.${subItem.value}`,
                                ]}
                                defaults={subItem.label}
                              />
                            </SelectItem>
                          ))}
                        </SelectGroup>,
                      )
                    }
                    return acc
                  }, [] as React.ReactNode[])}
                </SelectContent>
              </Select>
            </div>

            {/* Conditionally render Shop Name or Location */}
            {type === 'overseas' ? (
              <div className="flex flex-col space-y-2">
                <Label className={labelClassName} htmlFor="location">
                  {t('filter.location')}
                </Label>
                <ComboboxResponsive
                  options={locations}
                  placeholder={t('filter.placeholder.location')}
                  emptyText={t('filter.emptyText.location')}
                  item={value.location}
                  onItemChange={(newItem) => setValue((prev) => ({ ...prev, location: newItem }))}
                  disabled={loading}
                />
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Label className={labelClassName} htmlFor="name">
                  {t('filter.shop')}
                </Label>
                <ComboboxResponsive
                  options={shops}
                  placeholder={t('filter.placeholder.shop')}
                  emptyText={t('filter.emptyText.shop')}
                  item={value.shop}
                  onItemChange={(newItem) => {
                    if (newItem && newItem.groups?.length) {
                      const shopCategory = newItem.groups[0]
                      const shopCategoryItem =
                        categories.find((cat) => cat.value === shopCategory) ?? categories[0]
                      setValue((prev) => ({ ...prev, shop: newItem, category: shopCategoryItem }))
                    } else {
                      setValue((prev) => ({ ...prev, shop: newItem }))
                    }
                  }}
                  disabled={loading}
                />
              </div>
            )}

            {/* Amount */}
            <div className="flex flex-col space-y-2">
              <Label className={labelClassName} htmlFor="amount">
                {t('filter.amount')}
              </Label>
              <Select
                value={value.currency}
                onValueChange={(newCurrency) =>
                  setValue((prev) => ({
                    ...prev,
                    currency: newCurrency as 'local' | 'foreign',
                  }))
                }
                disabled={type !== 'online' || loading}
              >
                <SelectTrigger className="flex w-auto items-center justify-between h-9">
                  <SelectValue placeholder={t('filter.placeholder.currency')}>
                    {type === 'local'
                      ? t('filter.currency.local')
                      : type === 'overseas'
                        ? t('filter.currency.foreign')
                        : t(`filter.currency.${value.currency}`)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="local" className="h-9">
                    {t('filter.currency.local')}
                  </SelectItem>
                  <SelectItem value="foreign" className="h-9">
                    {t('filter.currency.foreign')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center justify-between space-x-2">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center pl-3 pointer-events-none text-muted-foreground text-xs">
                    HKD
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    value={value.amount}
                    min={0}
                    step={10}
                    maxLength={5}
                    className="text-right pl-12 pr-9 bg-background"
                    onChange={(e) =>
                      setValue((prev) => ({
                        ...prev,
                        amount: Number(e.target.value),
                      }))
                    }
                    onBlur={(e) => {
                      const parsedValue = Number(e.target.value)
                      setValue((prev) => ({
                        ...prev,
                        amount: parsedValue,
                      }))
                      e.target.value = String(parsedValue)
                    }}
                    disabled={loading}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={loading}
                      onClick={() => setValue((prev) => ({ ...prev, amount: 0 }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
