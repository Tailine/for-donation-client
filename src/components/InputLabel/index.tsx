import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'

type Props = {
  formControlProps?: FormControlProps
  inputProps: Partial<Omit<InputProps, 'name' | 'id'>> & {
    name: string
    id: string
    onValueChange(value): void
    initialValue?: string
  }
  labelProps: Partial<Omit<FormLabelProps, 'htmlFor'>> & {
    htmlFor: string
    labelText: string
  }
  errorMessage?: string
}

export function InputLabel({
  formControlProps,
  inputProps: { onValueChange, initialValue, ...restInputProps },
  labelProps,
  errorMessage
}: Props) {
  const [value, setValue] = useState(initialValue)

  function handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setValue(value)
    onValueChange(value)
  }

  const { labelText, ...restLabelProps } = labelProps
  const isFieldInvalid = formControlProps?.isInvalid

  return (
    <FormControl {...formControlProps}>
      <FormLabel color="gray.600" {...restLabelProps}>
        {labelText}
      </FormLabel>
      <Input
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
        onChange={handleChange}
        value={value}
        {...restInputProps}
      />
      {isFieldInvalid && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}
