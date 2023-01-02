import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react'

type Props = {
  color?: 'green' | 'yellow'
} & Omit<HeadingProps, 'color'>

const headingColors = {
  yellow: 'yellow.50',
  green: 'green.700'
}

export function Heading({ color = 'green', ...props }: Props) {
  return <ChakraHeading color={headingColors[color]} size="md" {...props} />
}
