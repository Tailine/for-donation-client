import { Box, Flex, Heading, Tag, TagLabel, Text } from '@chakra-ui/react'
import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import Image from 'next/image'
import { useState } from 'react'

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
}

export function DonationCard({
  id,
  category,
  description,
  image,
  title,
  controls
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleConfirm() {
    controls.onDelete(id)
    setIsModalVisible(false)
  }

  return (
    <Box
      maxWidth={400}
      backgroundColor="yellow.50"
      paddingY={6}
      paddingX={4}
      border="1px"
      borderColor="green.700"
    >
      <Box position="relative">
        <Image width={500} height={300} alt={image.alt} src={image.url} />
        <Tag
          right={2}
          bottom={4}
          position="absolute"
          backgroundColor="yellow.100"
          border="2px"
          borderRadius={0}
          borderColor="green.700"
        >
          <TagLabel
            paddingY={{ base: 2, md: 2 }}
            paddingX={{ base: 0, md: 2 }}
            color="green.700"
            fontWeight="bold"
            fontSize={{ base: 'x-small', md: 'small' }}
          >
            {category}
          </TagLabel>
        </Tag>
      </Box>
      <Box>
        <Heading color="green.700" marginY={4} size="md">
          {title}
        </Heading>
        <Text color="gray.600" fontSize="sm">
          {description}
        </Text>
      </Box>
      {controls && (
        <Flex marginTop={4} justifyContent="end">
          <Button size="sm" variant="ghost" onClick={() => controls.onEdit(id)}>
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
  )
}
