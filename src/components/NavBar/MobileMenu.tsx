import { Box, Divider, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export function MobileMenu() {
  return (
    <Box display={{ md: 'none' }}>
      <Flex
        direction="column"
        backgroundColor="gray.50"
        position="absolute"
        w="100%"
        paddingY={10}
        paddingX={4}
        gap={6}
        height="calc(100vh - 90px)"
      >
        <Link as={NextLink} href="/doacoes" color="black">
          Doações
        </Link>
        <Link as={NextLink} href="/minhas-doacoes" color="black">
          Minhas doações
        </Link>
        <Divider />
        <Flex align="center" marginBottom={4} gap={4}>
          <Box
            backgroundColor="gray.400"
            borderRadius="50%"
            height={50}
            width={50}
          />
          <Text fontSize="lg" color="black">
            Tailine
          </Text>
        </Flex>
        <Link as={NextLink} href="/perfil" color="black">
          Perfil
        </Link>
        <Link as={NextLink} href="/configuracoes" color="black">
          Configurações
        </Link>
        <Link as={NextLink} href="/login" color="black">
          Sair
        </Link>
      </Flex>
    </Box>
  )
}
