import {
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  isAuthenticated: boolean
}

export function NavBar({ isAuthenticated }: Props) {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <Flex
      as="header"
      justify="space-between"
      paddingX={16}
      paddingY={6}
      borderBottom="1px"
      borderColor="gray.200"
    >
      <NextLink href="/doacoes" legacyBehavior>
        <a>
          <Image src="/logo.png" height={100} width={100} alt="logo" />
        </a>
      </NextLink>
      {isAuthenticated && (
        <Flex align="center" justify="space-between" width="40%">
          <NavLink href="/doacoes" active={pathname}>
            Doações
          </NavLink>
          <NavLink href="/minhas-doacoes" active={pathname}>
            Minhas doações
          </NavLink>
          <Menu>
            <MenuButton>menu</MenuButton>
            <MenuList>
              <MenuItem>Configurações</MenuItem>
              <MenuItem>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  )
}

type NavLinkProps = {
  children: React.ReactNode
  href: string
  active: string
}

function NavLink({ children, href, active }: NavLinkProps) {
  const w = children.toString().length * 6
  const isActive = href === active

  return (
    <Box position="relative">
      <Link
        as={NextLink}
        href={href}
        display="block"
        color="black"
        fontSize={{ base: 'sm', md: 'md' }}
      >
        {children}
      </Link>
      {isActive && (
        <Box
          backgroundColor="purple.200"
          width={w}
          height={3}
          position="absolute"
          top="10px"
          right={0}
          left="6px"
          zIndex={-1}
        />
      )}
    </Box>
  )
}
