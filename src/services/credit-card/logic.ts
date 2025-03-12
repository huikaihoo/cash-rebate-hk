import { TFunction } from 'i18next'
import _ from 'lodash'

import { FilterValue } from '@/components/card/filter'
import { ResultCardBagdeProps, ResultCardProps } from '@/components/card/result'
import { imageUrl } from '@/lib/api'
import { fromEnum } from '@/lib/enum'
import { Channel, Period, Rebate, RebateWithCard } from '@/services/credit-card/model'

export function filterToChannel(selectedTab: string, currency: string): Channel {
  let channel: Channel

  switch (selectedTab) {
    case 'local':
      channel = Channel.PhysicalLocal
      break
    case 'overseas':
      channel = Channel.PhysicalOverseas
      break
    default:
      channel = currency === 'foreign' ? Channel.OnlineOverseas : Channel.OnlineLocal
      break
  }

  return channel
}

/**
 * Filters a rebate based on the given filter criteria.
 *
 * @param rebate - The rebate to be filtered
 * @param filterValue - The filter criteria containing category, shop, location, and amount
 * @returns `true` if the rebate passes all filter criteria, `false` otherwise
 */
export function filterRebate(
  rebate: Rebate,
  filterValue: FilterValue,
  selectedTab: string,
): boolean {
  const { category, shop, location, amount } = filterValue

  // Amount filtering - compare percentage with required minimum
  if (rebate.minAmount && amount > 0 && amount < rebate.minAmount) return false

  // Shop filtering
  if (selectedTab !== 'overseas') {
    const shopValue = shop?.value || ''
    // Skip if this rebate specifies shops and doesn't include this one
    if (rebate.shops?.length && !rebate.shops.includes(shopValue)) {
      return false
    }
  }

  // Location filtering (for overseas)
  if (selectedTab === 'overseas') {
    const locationValue = location?.value || ''

    // Skip if the rebate excludes this location
    if (rebate.locationExclude?.includes(locationValue)) {
      return false
    }
    // Skip if rebate specifies locations and doesn't include this one
    if (rebate.locationInclude?.length && !rebate.locationInclude.includes(locationValue)) {
      return false
    }
  }

  // Category filtering
  const categoryValues = new Set<string>()
  if (category?.value) {
    categoryValues.add(category.value)
  }
  if (selectedTab !== 'overseas' && shop?.groups?.length) {
    shop.groups.forEach((group) => {
      categoryValues.add(group)
    })
  }
  // Skip if the rebate excludes any of the selected categories
  if (rebate.categoriesExclude?.some((excludedCategory) => categoryValues.has(excludedCategory))) {
    return false
  }
  // Skip if rebate specifies categories and doesn't include this one
  if (
    rebate.categoriesInclude?.length &&
    _.isEmpty(_.intersection(rebate.categoriesInclude, [...categoryValues]))
  ) {
    return false
  }
  // Special handling for tax, ebanking, insurance categories
  // return false if rebate.categoriesInclude doesn't explicitly include these special categories
  if (
    category?.value === 'tax' ||
    category?.value === 'ebanking' ||
    category?.value === 'insurance'
  ) {
    if (
      selectedTab === 'overseas' ||
      !rebate.categoriesInclude?.length ||
      !rebate.categoriesInclude.includes(category.value)
    ) {
      return false
    }
  }

  // TODO: filter shops that charge with CBF

  // Date validation - check if rebate is still valid
  // const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  // if (rebate.startDate && today < rebate.startDate) return false
  // if (rebate.endDate && today > rebate.endDate) return false

  return true
}

export function periodT(period: Period | undefined, t: TFunction): string {
  if (period === undefined) return ''
  const key = fromEnum(Period, period)?.toLowerCase()
  return key ? t(`rebate.period.${key}`, { defaultValue: key }) : ''
}

/**
 * Converts a rebate object with card information to properties for rendering a result card.
 *
 * @param rebate - The rebate information with associated card details
 * @param selectedTab - The currently selected tab/category which affects badge styling
 * @param filterValue - The filter criteria containing category, shop, location, and amount
 * @param t - Translation function from useTranslation hook
 * @returns {ResultCardProps} - An object containing properties to render a result card
 */
export function rebateToResultCardProps(
  rebate: RebateWithCard,
  selectedTab: string,
  filterValue: FilterValue,
  t: TFunction,
): ResultCardProps {
  const { currency, amount } = filterValue

  const details: ResultCardBagdeProps[] = []

  // FCC / CBF
  if (
    rebate.card.charges.fcc > 0 &&
    (selectedTab === 'overseas' || (selectedTab === 'online' && currency === 'foreign'))
  ) {
    details.push({
      variant: 'warning',
      children: `FCC -${rebate.card.charges.fcc}%`,
    })
  }
  if (selectedTab === 'online' && currency === 'local') {
    if (rebate.excludeCbf) {
      details.push({
        variant: 'destructive',
        children: 'CBF→0%',
      })
    }
    if (rebate.card.charges.cbf > 0) {
      details.push({
        variant: 'warning',
        children: `CBF -${rebate.card.charges.cbf}%`,
      })
    }
  }
  // min / max spending amount
  if (rebate.minAmount) {
    details.push({
      children: `${t('rebate.min')}: $${rebate.minAmount}/${periodT(rebate.minPeriod, t)}`,
    })
  }
  if (rebate.maxAmount) {
    details.push({
      variant: amount > 0 && amount > rebate.maxAmount ? 'warning' : 'secondary',
      children: `${t('rebate.max')}: $${rebate.maxAmount}/${periodT(rebate.maxPeriod, t)}`,
    })
  }
  if (!rebate.minAmount && !rebate.maxAmount) {
    details.push({ children: t('rebate.unlimited') })
  }
  // rebate period
  if (rebate.startDate && new Date(rebate.startDate) > new Date()) {
    details.push({
      children: `${t('rebate.start')}: ${rebate.startDate}`,
    })
  }
  if (rebate.endDate) {
    details.push({
      children: `${t('rebate.end')}: ${rebate.endDate}`,
    })
  }

  return {
    imageUrl: imageUrl(rebate.cardId),
    title: rebate.card.name,
    percentages: rebate.card.percentages.map((percentage) => ({
      variant: rebate.percentage === percentage ? selectedTab : 'secondary',
      children: `${percentage}%`,
    })),
    details,
  } as ResultCardProps
}
