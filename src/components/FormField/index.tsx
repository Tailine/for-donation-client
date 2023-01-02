import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps
} from '@chakra-ui/react'

export type Props = {
  labelProps: Partial<Omit<FormLabelProps, 'htmlFor'>> & {
    htmlFor: string
    labelText: string
  }
  formControlProps?: FormControlProps
  errorMessage?: string
  children: JSX.Element
}

export function FormField({
  labelProps: { labelText, ...restLabelProps },
  formControlProps,
  errorMessage,
  children
}: Props) {
  const isFieldInvalid = formControlProps?.isInvalid

  return (
    <FormControl {...formControlProps}>
      <FormLabel color="gray.600" {...restLabelProps}>
        {labelText}
      </FormLabel>
      {children}
      {isFieldInvalid && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}
