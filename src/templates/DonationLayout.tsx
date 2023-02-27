import { Box, Flex, Grid, Spacer } from '@chakra-ui/react'
import { Heading } from 'components/Heading'
import { NewDonation } from 'components/NewDonation'
import { Search } from 'components/Search'
import { Main } from './Main'

type Props = {
  title: string
  children: JSX.Element
  shouldDisplayAddDonation: boolean
  userId?: string
}

export function DonationLayout({
  title,
  shouldDisplayAddDonation,
  userId,
  children
}: Props) {
  return (
    <Main>
      <Box paddingX={{ base: 6, md: 16 }} paddingY={12}>
        <Heading marginBottom={12} size="lg">
          {title}
        </Heading>
        <Flex as="section" justifyContent="space-between" marginBottom={12}>
          <Search />
          <Spacer />
          {shouldDisplayAddDonation && <NewDonation userId={userId} />}
        </Flex>
        <Grid
          as="section"
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
    </Main>
  )
}
