import { useState, useEffect, useCallback } from 'react'
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
      throw err
    } finally {
      setLoading(false)
    }
  }, [service])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [fetchData, immediate])

  return { data, loading, error, refetch: fetchData }
}
