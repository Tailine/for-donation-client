import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

export type Props = Partial<Omit<SelectProps, 'name' | 'id'>> & {
  options: { value: string; label: string }[]
  name: string
  id: string
  onOptionChange(value: string): void
  placeholder?: string
}

export function Select({
  options,
  onOptionChange,
  placeholder,
  ...restSelectProps
}: Props) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onOptionChange(e.target.value)
  }

  const selectOptions = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

  return (
    <ChakraSelect
      placeholder={placeholder}
      transition="all 100ms"
      boxShadow={0}
      _hover={{
        borderColor: 'purple.800'
      }}
      _focus={{
        borderColor: 'purple.700',
        boxShadow: 'unset',
        borderWidth: 2
      }}
      borderColor="gray.500"
      borderRadius={0}
      onChange={handleChange}
      {...restSelectProps}
    >
      {selectOptions}
    </ChakraSelect>
  )
}
