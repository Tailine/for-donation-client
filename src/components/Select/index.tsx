import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  Select as ChakraSelect,
  SelectProps,
  FormErrorMessage
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'

export type Props = {
  formControlProps?: FormControlProps
  options: { value: string; label: string }[]
  selectProps: Partial<Omit<SelectProps, 'name' | 'id'>> & {
    name: string
    id: string
    onOptionChange(value: string): void
    placeholder?: string
  }
  labelProps: Partial<Omit<FormLabelProps, 'htmlFor'>> & {
    htmlFor: string
    labelText: string
  }
  errorMessage?: string
}

export function Select({
  formControlProps,
  options,
  selectProps: { onOptionChange, placeholder, ...restSelectProps },
  labelProps,
  errorMessage
}: Props) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onOptionChange(e.target.value)
  }

  const isFieldInvalid = formControlProps?.isInvalid

  const selectOptions = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

  const { labelText, ...restLabelProps } = labelProps
  return (
    <FormControl isInvalid={isFieldInvalid}>
      <FormLabel color="gray.500" {...restLabelProps}>
        {labelText}
      </FormLabel>
      <ChakraSelect
        placeholder={placeholder}
        transition="all 100ms"
        boxShadow={0}
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
        {...restSelectProps}
      >
        {selectOptions}
      </ChakraSelect>
      {isFieldInvalid && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}
