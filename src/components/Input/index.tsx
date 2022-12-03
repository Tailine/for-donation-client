import { Input as ChakraInput, InputProps } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'

type Props = Partial<Omit<InputProps, 'name' | 'id'>> & {
  name: string
  id: string
  onValueChange(value: string): void
  initialValue?: string
  formatInput?(value: string): string
}

export function Input({
  onValueChange,
  initialValue = '',
  formatInput,
  ...restInputProps
}: Props) {
  const [value, setValue] = useState(
    formatInput?.(initialValue) ?? initialValue ?? ''
  )

  function handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    if (formatInput) {
      setValue(formatInput(value))
    } else {
      setValue(value)
    }
    onValueChange(value)
  }

  return (
    <ChakraInput
      boxShadow={0}
      transition="all 100ms"
      _hover={{
        borderColor: 'green.800'
      }}
      _focus={{
        borderColor: 'green.700',
        boxShadow: 'unset',
        borderWidth: 2
      }}
      borderColor="gray.500"
      borderRadius={0}
      onChange={handleChange}
      value={value}
      {...restInputProps}
    />
  )
}
