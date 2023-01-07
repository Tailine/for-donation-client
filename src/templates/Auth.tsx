import { Box, Flex, Stack } from '@chakra-ui/react'
import { Heading } from 'components/Heading'
import Image from 'next/image'

type Props = {
  title: string
  children: JSX.Element
}

export function Auth({ title, children }: Props) {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      paddingY={{ base: 20, lg: 0 }}
      paddingX={{ base: 4, lg: 0 }}
      backgroundColor="purple.800"
      minH="100vh"
      justifyContent={{
        base: 'stretch'
      }}
    >
      <Flex
        flexDirection="column"
        width={{ base: 'auto', lg: '50%' }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Heading
          textAlign={{ base: 'center', lg: 'start' }}
          size={{ base: 'xl', md: '2xl' }}
          width={{ base: 'auto', lg: '68%', '4k': 'auto' }}
          paddingTop={{ base: 6, md: 0, lg: 16, '4k': 0 }}
          color="yellow"
          marginBottom={{ base: 12 }}
        >
          {title}
        </Heading>
        <Box
          display={{ base: 'none', lg: 'flex' }}
          justifyContent="center"
          marginTop={20}
        >
          <Image
            src="/donation.png"
            alt="illustration of five people behind donatio boxes"
            width={700}
            height={200}
          />
        </Box>
      </Flex>
      <Box backgroundColor="gray.50" width={{ base: 'auto', lg: '50%' }}>
        {children}
      </Box>
    </Stack>
  )
}
