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

export interface FilterValue {
  category: Item | null
  name: Item | null
  location: Item | null
  amount: number
}

export interface FilterOptions {
  categories: Item[]
  names: Item[]
  locations: Item[]
}

export interface FilterContentProps {
  type: 'online' | 'physical' | 'overseas'
  options: FilterOptions
  value: FilterValue
  setValue: React.Dispatch<React.SetStateAction<FilterValue>>
}

export function FilterCard({ type, value, options, setValue }: FilterContentProps) {
  const [accordionState, setAccordionState] = useLocalStorage('filterAccordionState', 'filter')
  const { names, categories, locations } = options

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
            <ListFilter /> <span>Filter</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid w-full items-center gap-4 pt-4 px-2">
            {/* Shop Category */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="category">Shop Category</Label>
              <Select
                value={value.category?.value || ''}
                onValueChange={(newValue) => {
                  const newCategory = categories.find((cat) => cat.value === newValue) || null
                  setValue((prev) => ({ ...prev, category: newCategory }))
                }}
              >
                <SelectTrigger className="w-full justify-between">
                  <SelectValue placeholder="Select shop category ...">
                    {value.category?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditionally render Shop Name or Location */}
            {type === 'overseas' ? (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="location">Location</Label>
                <ComboboxResponsive
                  options={locations}
                  placeholder="Search for location ..."
                  emptyText="No location found."
                  item={value.location}
                  onItemChange={(newItem) => setValue((prev) => ({ ...prev, location: newItem }))}
                />
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Shop Name</Label>
                <ComboboxResponsive
                  options={names}
                  placeholder="Search for shop ..."
                  emptyText="No shop found."
                  item={value.name}
                  onItemChange={(newItem) => setValue((prev) => ({ ...prev, name: newItem }))}
                />
              </div>
            )}

            {/* Amount */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="amount">Amount</Label>
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
