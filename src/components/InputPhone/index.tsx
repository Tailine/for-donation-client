import { InputProps } from '@chakra-ui/react'
import { Input } from 'components/Input'
import { phoneMask } from 'utils/phoneMask'

type Props = Partial<Omit<InputProps, 'name' | 'id'>> & {
  name: string
  id: string
  onValueChange(value): void
  initialValue?: string
}

export function InputPhone({ onValueChange, ...props }: Props) {
  return (
    <Input
      type="tel"
      formatInput={phoneMask}
      onValueChange={onValueChange}
      {...props}
    />
  )
}
