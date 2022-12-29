import { Box, Center, Text } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export function CreateAccountSuccess() {
  return (
    <Center backgroundColor="yellow.50" height="70vh">
      <Box>
        <Center>
          <Image
            src="/check.png"
            alt="image of a green check mark"
            width={70}
            height={70}
          />
        </Center>
        <Text marginTop={6} color="gray.700">
          Conta criada com sucesso.
        </Text>
        <Link
          as={NextLink}
          href="/sign-in"
          display="block"
          textAlign="center"
          color="yellow.500"
        >
          Efetuar login
        </Link>
      </Box>
    </Center>
  )
}
