'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Item } from '@/models/basic'

interface ComboboxResponsiveProps {
  options: Item[]
  placeholder?: string
  emptyText?: string
  item: Item | null
  onItemChange: (item: Item | null) => void
}

export function ComboboxResponsive({
  options,
  placeholder,
  emptyText,
  item,
  onItemChange,
}: ComboboxResponsiveProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = React.useState(false)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="Combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {item ? <>{item.label}</> : <div className="text-muted-foreground">{placeholder}</div>}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="center">
          <ItemList
            options={options}
            selectedItem={item}
            setOpen={setOpen}
            onItemChange={onItemChange}
            placeholder={placeholder}
            emptyText={emptyText}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="justify-between">
          {item ? <>{item.label}</> : <div className="text-muted-foreground">{placeholder}</div>}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ItemList
            options={options}
            selectedItem={item}
            setOpen={setOpen}
            onItemChange={onItemChange}
            placeholder={placeholder}
            emptyText={emptyText}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

interface ItemListProps {
  options: Item[]
  selectedItem: Item | null
  setOpen: (open: boolean) => void
  onItemChange: (item: Item | null) => void
  placeholder?: string
  emptyText?: string
}

function ItemList({
  options,
  selectedItem,
  setOpen,
  onItemChange,
  placeholder,
  emptyText,
}: ItemListProps) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup>
          {options.map((currItem) => (
            <CommandItem
              key={currItem.value}
              value={currItem.value}
              onSelect={() => {
                if (selectedItem?.value === currItem.value) {
                  onItemChange(null)
                } else {
                  onItemChange(currItem)
                }
                setOpen(false)
              }}
            >
              {currItem.label}
              <Check
                className={cn(
                  'ml-auto',
                  selectedItem?.value === currItem.value ? 'opacity-100' : 'opacity-0',
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
