import { useState, useEffect, useCallback, useRef } from 'react'
import { Service } from '@/models/basic'

export function useService<T>(service: Service<T>, immediate = true) {
  const [data, setData] = useState<T>(() => service.getDefaultData())
  const [loading, setLoading] = useState<boolean>(immediate)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await service.getData()
      setData(result)
      return result
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [service])

  // This ref tracks whether the initial fetch has been called.
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (immediate && !fetchedRef.current) {
      fetchedRef.current = true
      fetchData()
    }
  }, [immediate, fetchData])

  return { data, loading, error, refetch: fetchData }
}
