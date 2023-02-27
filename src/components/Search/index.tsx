import { Input } from 'components/Input'
import { useDebounce } from 'hooks/useDebounce'
import { useEffect, useState } from 'react'

// type Props = {}

export function Search() {
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce<string>(searchValue)

  console.log({ searchValue })

  useEffect(() => {
    if (debouncedValue) {
      // call mutate func
      console.log({ debouncedValue })
    }
  }, [debouncedValue])

  return (
    <Input
      maxWidth={500}
      placeholder="Buscar doação"
      name="search"
      aria-label="buscar"
      onValueChange={(a) => setSearchValue(a)}
    />
  )
}
