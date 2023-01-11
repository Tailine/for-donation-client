import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

type Props = {
  children: React.ReactNode
  href: string
  active: string
}

export function NavLink({ children, href, active }: Props) {
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
        position="relative"
        zIndex={1}
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
          zIndex={0}
        />
      )}
    </Box>
  )
}
