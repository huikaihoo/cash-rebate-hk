import { useState, useEffect } from 'react'

export function useLocalStorage<Type>(
  key: string,
  initialState: Type | (() => Type),
): [Type, React.Dispatch<React.SetStateAction<Type>>] {
  // read key from local storage if not found use default value
  const [value, setValue] = useState<Type>(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue === null) {
      if (typeof initialState === 'function') {
        return (initialState as () => Type)()
      } else {
        return initialState
      }
    } else {
      return JSON.parse(storedValue)
    }
  })

  // update local storage when value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
