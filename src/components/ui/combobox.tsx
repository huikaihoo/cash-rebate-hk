'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { WithClearButton } from '@/components/ui/with-clear-button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Item } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ComboboxResponsiveProps {
  options: Item[]
  placeholder?: string
  emptyText?: string
  item: Item | null
  onItemChange: (item: Item | null) => void
  disabled?: boolean
}

export function ComboboxResponsive({
  options,
  placeholder,
  emptyText,
  item,
  onItemChange,
  disabled = false,
}: ComboboxResponsiveProps) {
  const isDesktop = !useMediaQuery('(max-width: 768px),(hover:none),(pointer:coarse)')
  const [open, setOpen] = useState(false)

  const triggerButton = (
    <Button
      aria-expanded={open}
      variant="none"
      className="justify-between w-full border-none pl-3 pr-2 [&>span]:line-clamp-1"
      disabled={disabled}
    >
      <span className="text-left text-wrap">
        {item ? item.label : <span className="text-muted-foreground">{placeholder}</span>}
      </span>
      <ChevronsUpDown className="h-4 w-4 opacity-50" />
    </Button>
  )

  const itemList = (
    <ItemList
      options={options}
      selectedItem={item}
      setOpen={setOpen}
      onItemChange={onItemChange}
      placeholder={placeholder}
      emptyText={emptyText}
      disabled={disabled}
    />
  )

  // Render the appropriate UI based on device type
  return (
    <WithClearButton
      onClear={() => {
        onItemChange(null)
        setOpen(false)
      }}
      disabled={disabled}
    >
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
          <PopoverContent className="p-0" align="center">
            {itemList}
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="sr-only">
              <DrawerTitle />
              <DrawerDescription />
            </DrawerHeader>
            <div className="mt-4 border-t">{itemList}</div>
          </DrawerContent>
        </Drawer>
      )}
    </WithClearButton>
  )
}

interface ItemListProps {
  options: Item[]
  selectedItem: Item | null
  setOpen: (open: boolean) => void
  onItemChange: (item: Item | null) => void
  placeholder?: string
  emptyText?: string
  disabled?: boolean
}

function ItemList({
  options,
  selectedItem,
  setOpen,
  onItemChange,
  placeholder,
  emptyText,
  disabled = false,
}: ItemListProps) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} disabled={disabled} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup>
          {options.map((currItem) => (
            <CommandItem
              key={currItem.value}
              value={currItem.label}
              onSelect={() => {
                if (disabled) return
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
