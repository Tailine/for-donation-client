import { Box, Flex, Stack } from '@chakra-ui/react'
import { Heading } from 'components/Heading'
import { RegisterForm } from 'components/RegisterForm'
import { State } from 'domain/types'
import Image from 'next/image'
import { apiUrl } from 'utils/apiUrl'

interface Props {
  states: State[]
}

export default function SignUp({ states = [] }: Props) {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      paddingY={{ base: 20, lg: 0 }}
      paddingX={{ base: 4, lg: 0 }}
      backgroundColor="green.800"
      minH="100vh"
      justifyContent={{
        base: 'stretch'
      }}
    >
      <Flex flexDirection="column" width={{ base: 'auto', lg: '50%' }}>
        <Heading
          textAlign={{ base: 'center', lg: 'start' }}
          size={{ base: 'xl', md: '2xl' }}
          width={{ base: 'auto', lg: '68%' }}
          marginLeft={{ base: 0, lg: 20 }}
          paddingTop={{ base: 6, md: 0, lg: 16 }}
          color="yellow"
          marginBottom={{ base: 12 }}
        >
          Cadastre-se e ajude a quem precisa
        </Heading>
        <Box
          display={{ base: 'none', lg: 'flex' }}
          justifyContent="center"
          marginTop={20}
        >
          <Image
            src="/donation.png"
            alt="illustration of five people behind donatio boxes"
            width={500}
            height={100}
          />
        </Box>
      </Flex>
      <RegisterForm states={states} />
    </Stack>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`${apiUrl()}/place/state`)
  const data: { data: State[] } = await response.json()

  return {
    props: {
      states: data.data
    }
  }
}
