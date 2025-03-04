'use client'

import { X } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WithClearButtonProps {
  children: React.ReactNode
  onClear: () => void
  showClearButton?: boolean
  disabled?: boolean
  className?: string
  clearButtonClassName?: string
  containerClassName?: string
}

export function WithClearButton({
  children,
  onClear,
  showClearButton = true,
  disabled = false,
  className,
  clearButtonClassName,
  containerClassName,
}: WithClearButtonProps) {
  return (
    <div className={cn('flex items-center rounded-md border', containerClassName)}>
      <div className={cn('flex-1', className)}>{children}</div>
      {showClearButton && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={clearButtonClassName}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClear()
          }}
          disabled={disabled}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
