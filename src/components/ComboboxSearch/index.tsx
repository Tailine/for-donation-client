import { formatSearchString } from 'utils/formatSearchString'
import ReactSelect, { StylesConfig } from 'react-select'

type Props = {
  options: { label: string; value: string }[]
  id: string
  name: string
  onChange(value: string): void
  placeholder?: string
  isInvalid?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  ariaLabel?: string
}

function getBorderColor(
  isFocused: boolean,
  isDisabled: boolean,
  isInvalid: boolean
) {
  if (isInvalid) return '#B44B4B'
  if (isDisabled) return '#dcdcdc'
  if (isFocused) return '#293D39'
  return '#718096'
}

function stylesOverride(isInvalid: boolean): StylesConfig {
  return {
    control: (css, props) => {
      return {
        ...css,
        borderColor: getBorderColor(
          props.isFocused,
          props.isDisabled,
          isInvalid
        ),
        backgroundColor: props.isDisabled ? '#F0F5F4' : 'transparent',
        borderRadius: 0,
        boxShadow: isInvalid ? '0 0 0 1px #B44B4B' : 'none',
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
    }),
    dropdownIndicator: (css) => ({
      ...css,
      color: '#293D39'
    })
  }
}

export function ComboboxSearch({
  options,
  onChange,
  name,
  id,
  placeholder = 'Selecione uma opção',
  isDisabled = false,
  isLoading = false,
  isInvalid = false,
  ariaLabel
}: Props) {
  return (
    <ReactSelect
      data-testid="select-city"
      instanceId={id}
      isDisabled={isDisabled}
      isLoading={isLoading}
      id={id}
      aria-label={ariaLabel}
      name={name}
      onChange={(selected: { label: string; value: string }) =>
        onChange(selected.value)
      }
      options={options}
      placeholder={placeholder}
      styles={stylesOverride(isInvalid)}
      filterOption={(option, input) => {
        return formatSearchString(option.label).includes(
          formatSearchString(input)
        )
      }}
    />
  )
}
