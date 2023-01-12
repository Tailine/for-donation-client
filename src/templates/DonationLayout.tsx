import { Box, Grid } from '@chakra-ui/react'
import { Heading } from 'components/Heading'
import { NavBar } from 'components/NavBar'

type Props = {
  title: string
  children: JSX.Element
}

export function DonationLayout({ title, children }: Props) {
  return (
    <Box backgroundColor="gray.50" minHeight="100vh" width="100%">
      <NavBar isAuthenticated />
      <Box paddingX={{ base: 6, md: 16 }} paddingY={12}>
        <Heading marginBottom={12} size="lg">
          {title}
        </Heading>
        <Grid
          gap={10}
          gridTemplateColumns={{
            base: '1fr',
            md: '1fr 1fr',
            xl: 'repeat(3, 1fr)',
            '2xl': 'repeat(4, 1fr)',
            '4k': 'repeat(5, 1fr)'
          }}
        >
          {children}
        </Grid>
      </Box>
    </Box>
  )
}
