import { Box, Flex, Link, Tag, TagLabel, Text } from '@chakra-ui/react'
import { Button } from 'components/Button'
import { Heading } from 'components/Heading'
import { Modal } from 'components/Modal'
import Image from 'next/image'
import { useState } from 'react'
import { Raleway } from '@next/font/google'
import { Location } from 'components/Icons/Location'
import NextLink from 'next/link'

const raleway = Raleway({ weight: '500', subsets: ['latin'] })

export type Props = {
  id: string
  title: string
  category: string
  image: {
    url: string
    alt: string
  }
  description: string
  controls?: {
    onEdit(id: string): void
    onDelete(id: string): void
  }
  location: {
    city: string
    state: string
  }
}

export function DonationCard({
  id,
  category,
  description,
  image,
  title,
  location,
  controls
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleConfirm() {
    controls.onDelete(id)
    setIsModalVisible(false)
  }

  return (
    <Link
      maxWidth={400}
      as={NextLink}
      href={`doacao/${id}`}
      textDecoration="none"
      _hover={{
        textDecoration: 'none',
        transform: 'translate(0, -10px)',
        boxShadow: '5px 5px rgb(76,77,128)'
      }}
    >
      <Box height="100%" backgroundColor="yellow.50" paddingY={6} paddingX={4}>
        <Box position="relative">
          <Box
            position="relative"
            height={{ base: 120, md: 150 }}
            width={{ base: '100%' }}
            marginBottom={4}
          >
            {' '}
            <Image alt={image.alt} src={image.url} fill />
          </Box>
          <Tag
            right={2}
            bottom={4}
            position="absolute"
            backgroundColor="purple.200"
            border="2px"
            borderRadius={0}
            borderColor="purple.700"
          >
            <TagLabel
              paddingY={{ base: 2, md: 2 }}
              paddingX={{ base: 0, md: 2 }}
              color="purple.700"
              fontWeight="bold"
              fontSize={{ base: 'x-small', md: 'small' }}
            >
              {category}
            </TagLabel>
          </Tag>
        </Box>
        <Box fontFamily="inherit">
          <Heading marginY={4} size="md">
            {title}
          </Heading>
          <Flex marginY={4}>
            <Location />
            <Text
              marginLeft={2}
              color="gray.500"
              fontSize="xs"
              className={raleway.className}
            >
              {location.city} - {location.state}
            </Text>
          </Flex>
          <Text color="black" fontSize="sm" className={raleway.className}>
            {description}
          </Text>
        </Box>
        {controls && (
          <Flex marginTop={4} justifyContent="end">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => controls.onEdit(id)}
            >
              Editar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              marginLeft={2}
              color="red.500"
              colorScheme="red"
              fontSize="small"
              onClick={() => setIsModalVisible(true)}
            >
              Deletar
            </Button>
          </Flex>
        )}
        <Modal
          title="Excluir doação"
          content={<Text>Tem certeza que deseja excluir essa doação?</Text>}
          isOpen={isModalVisible}
          footer={
            <Box marginTop={4}>
              <Button
                variant="outlined"
                colorScheme="green"
                marginRight={6}
                onClick={() => setIsModalVisible(false)}
              >
                Cancelar
              </Button>
              <Button variant="solid" onClick={handleConfirm}>
                Confirmar
              </Button>
            </Box>
          }
        />
      </Box>
    </Link>
  )
}
