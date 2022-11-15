import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps
} from '@chakra-ui/react'

type Props = {
  formControlProps?: FormControlProps
  inputProps: Partial<Omit<InputProps, 'name' | 'id'>> & {
    name: string
    id: string
  }
  labelProps: Partial<Omit<FormLabelProps, 'htmlFor'>> & {
    htmlFor: string
    labelText: string
  }
  errorMessage?: string
}

export function InputLabel({
  formControlProps,
  inputProps,
  labelProps,
  errorMessage
}: Props) {
  const { labelText, ...restLabelProps } = labelProps
  const isFieldInvalid = formControlProps?.isInvalid
  const invalidStyle = isFieldInvalid ? { borderColor: 'red.500' } : undefined

  return (
    <FormControl {...formControlProps}>
      <FormLabel color="green.700" {...restLabelProps}>
        {labelText}
      </FormLabel>
      <Input
        _invalid={invalidStyle}
        boxShadow={0}
        _focus={{
          borderColor: 'green.700',
          boxShadow: 'unset',
          borderWidth: 2
        }}
        borderColor="gray.500"
        {...inputProps}
      />
      {formControlProps?.isInvalid && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}
