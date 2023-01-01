import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import { Heading } from 'components/Heading'

export function CreateAccountSuccess() {
  return (
    <Box
      width={{ base: 'auto', lg: '50%' }}
      maxW={{ base: 'auto' }}
      color="white"
      display="flex"
      justifyContent="center"
    >
      <Box
        backgroundColor="yellow.50"
        maxW={{ base: 600, lg: '100%' }}
        height={{ base: '50vh', md: 'auto', lg: '100vh' }}
        paddingY={{ base: 0, md: 24 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Box
          position="relative"
          height={{ base: 100, md: 120 }}
          width={{ base: 100, md: 120 }}
          marginBottom={4}
        >
          {' '}
          <Image
            src="/party_popper.png"
            alt="image of a green check mark"
            fill
          />
        </Box>
        <Heading>Parabéns!</Heading>
        <Text
          marginTop={6}
          color="gray.700"
          fontSize={{ base: 'md', md: 'xl' }}
        >
          Conta criada com sucesso.
        </Text>
        <Link
          as={NextLink}
          href="/sign-in"
          display="block"
          textAlign="center"
          color="yellow.500"
          fontSize={{ base: 'md', md: 'xl' }}
        >
          Efetuar login
        </Link>
      </Box>
    </Box>
  )
}
