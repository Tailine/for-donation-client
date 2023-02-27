import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react'

type Props = Omit<ChakraButtonProps, 'variant'> & {
  variant?: 'solid' | 'ghost' | 'outlined'
}

const buttonStyles: Record<Props['variant'], ChakraButtonProps> = {
  ghost: {
    colorScheme: 'purple',
    variant: 'ghost',
    background: 'transparent',
    _focus: {
      background: 'transparent'
    }
  },
  outlined: {
    colorScheme: 'purple',
    variant: 'ghost',
    border: '1px',
    borderColor: 'purple.700',
    color: 'purple.700'
  },
  solid: {
    colorScheme: 'yellow',
    variant: 'solid',
    border: '1px',
    borderColor: 'purple.700',
    color: 'purple.700',
    backgroundColor: 'yellow.300'
  }
}

export function Button({ variant = 'solid', ...rest }: Props) {
  return (
    <ChakraButton
      {...buttonStyles[variant!]}
      fontSize="small"
      textTransform="uppercase"
      borderRadius={0}
      {...rest}
    />
  )
}
