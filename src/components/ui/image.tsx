import React, { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  children?: React.ReactNode
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, loading, className, children, ...props }, ref) => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

    useEffect(() => {
      if (src) {
        const img = new window.Image()
        img.src = src
        img.onload = () => setStatus('success')
        img.onerror = () => setStatus('error')

        // Cleanup function
        return () => {
          img.src = ''
          img.onload = null
          img.onerror = null
        }
      } else {
        setStatus('error')
      }
    }, [src])

    return (
      <>
        {status === 'success' ? (
          <img
            src={src}
            alt={alt}
            loading={loading || 'lazy'}
            ref={ref}
            className={className}
            {...props}
          />
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
