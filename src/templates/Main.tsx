import { Box } from '@chakra-ui/react'
import { NavBar } from 'components/NavBar'

type Props = {
  children: JSX.Element
}

export function Main({ children }: Props) {
  return (
    <Box backgroundColor="gray.50" minHeight="100vh" width="100%">
      <NavBar isAuthenticated />
      <main>{children}</main>
    </Box>
  )
}
