import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delayMs = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>()

  useEffect(() => {
    let timeout = null

    timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => {
      console.log('clearTimeout')
      clearTimeout(timeout)
    }
  }, [value, delayMs])

  return debouncedValue
}
