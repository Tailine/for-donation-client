import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps
} from '@chakra-ui/react'
import { formatSearchString } from 'utils/formatSearchString'
import ReactSelect, { StylesConfig } from 'react-select'

type Props = {
  options: { label: string; value: string }[]
  onChange(value: string): void
  labelProps: Partial<Omit<FormLabelProps, 'htmlFor'>> & {
    htmlFor: string
    labelText: string
  }
  placeholder?: string
  formControlProps?: FormControlProps
  errorMessage?: string
}

const styles: StylesConfig = {
  control: (css, props) => {
    return {
      ...css,
      borderColor: props.isFocused ? '#293D39' : '#718096',
      borderRadius: 0,
      boxShadow: 'none',
      borderWidth: props.isFocused ? 2 : 1,
      ':hover': { borderColor: '#293D39' }
    }
  },
  input: (css) => ({
    ...css,
    borderColor: '#293D39'
  }),
  option: (css, props) => ({
    ...css,
    backgroundColor: props.isSelected
      ? '#9EBDB8'
      : props.isFocused
      ? '#D5E2E0'
      : 'unset',
    ':active': { backgroundColor: '#9EBDB8' },
    ':hover': { borderColor: '#293D39' }
  }),
  indicatorSeparator: (css) => ({
    ...css,
    display: 'none'
  })
}

export function SelectSearch({
  formControlProps,
  options,
  onChange,
  labelProps: { labelText, ...restLabelProps },
  placeholder = 'Selecione uma opção',
  errorMessage
}: Props) {
  const isFieldInvalid = formControlProps?.isInvalid

  return (
    <FormControl>
      <FormLabel color="gray.500" {...restLabelProps}>
        {labelText}
      </FormLabel>
      <ReactSelect
        onChange={(selected: { label: string; value: string }) =>
          onChange(selected.value)
        }
        options={options}
        placeholder={placeholder}
        styles={styles}
        filterOption={(option, input) => {
          return formatSearchString(option.label).includes(
            formatSearchString(input)
          )
        }}
      />
      {isFieldInvalid && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}
