import {
  Box,
  Fade,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MobileMenu } from './MobileMenu'
import { NavLink } from './NavLink'

type Props = {
  isAuthenticated: boolean
}

export function NavBar({ isAuthenticated }: Props) {
  const [isOpen, setisOpen] = useState(false)
  const router = useRouter()
  const pathname = router.pathname

  function handleMenu() {
    setisOpen(!isOpen)
  }

  return (
    <>
      {isOpen && (
        <style global jsx>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      <Flex
        as="header"
        justify="space-between"
        paddingX={{ base: 6, md: 16 }}
        paddingY={6}
        borderBottom="1px"
        borderColor="gray.200"
        position="relative"
        backgroundColor="gray.50"
      >
        <NextLink href="/doacoes" legacyBehavior>
          <a>
            <Image src="/logo.png" height={100} width={100} alt="logo" />
          </a>
        </NextLink>
        {isAuthenticated && (
          <>
            <Flex
              align="center"
              justify="space-between"
              width={{
                base: '40%',
                lg: '30%',
                xl: '25%',
                '2xl': '20%',
                '4k': '15%'
              }}
              display={{ base: 'none', md: 'flex' }}
            >
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
            {!isOpen && (
              <Flex
                direction="column"
                align="flex-end"
                justify="center"
                as="button"
                onClick={handleMenu}
                display={{ base: 'flex', md: 'none' }}
              >
                <Box w="30px" h="2px" backgroundColor="purple.800" />
                <Box
                  w="20px"
                  h="2px"
                  backgroundColor="purple.800"
                  marginTop={1}
                />
                <Box
                  w="10px"
                  h="2px"
                  backgroundColor="purple.800"
                  marginTop={1}
                />
              </Flex>
            )}
            {isOpen && (
              <Flex
                position="relative"
                direction="column"
                align="flex-end"
                justify="center"
                as="button"
                onClick={handleMenu}
                display={{ base: 'flex', md: 'none' }}
              >
                <Box
                  w="20px"
                  h="2px"
                  backgroundColor="purple.800"
                  transform="rotate(135deg)"
                />
                <Box
                  position="absolute"
                  w="20px"
                  h="2px"
                  backgroundColor="purple.800"
                  transform="rotate(-135deg)"
                />
              </Flex>
            )}
          </>
        )}
      </Flex>
      {isOpen && (
        <Fade in={isOpen}>
          <MobileMenu />
        </Fade>
      )}
    </>
  )
}
