import {
  Box,
  Button,
  Flex,
  Heading,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'

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
  controls,
}: Props) {
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
          <Button
            colorScheme="green"
            size="sm"
            variant="outline"
            textTransform="uppercase"
            borderRadius={0}
            fontSize="small"
            onClick={() => controls.onEdit(id)}
          >
            Editar
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            variant="outline"
            textTransform="uppercase"
            marginLeft={4}
            borderRadius={0}
            fontSize="small"
            onClick={() => controls.onDelete(id)}
          >
            Deletar
          </Button>
        </Flex>
      )}
    </Box>
  )
}
