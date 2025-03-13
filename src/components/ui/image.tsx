import React, { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  children?: React.ReactNode
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt = 'image', className, children, ...props }, ref) => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

    useEffect(() => {
      if (src) {
        const img = new window.Image()
        img.src = src
        img.onload = () => setStatus('success')
        img.onerror = () => setStatus('error')
      } else {
        setStatus('error')
      }
    }, [src])

    return (
      <>
        {status === 'success' ? (
          <img ref={ref} src={src} alt={alt} className={className} {...props} />
        ) : status === 'error' && children ? (
          <div className={className}>{children}</div>
        ) : (
          <Skeleton className={className} />
        )}
      </>
    )
  },
)
Image.displayName = 'Image'

export { Image }
