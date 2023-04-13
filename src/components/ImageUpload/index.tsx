import {
  Box,
  Center,
  Input as ChakraInput,
  Flex,
  Stack
} from '@chakra-ui/react'
import { Button } from 'components/Button'
import { ImageData } from 'components/DonationForm'
import { FormField } from 'components/FormField'
import { Input } from 'components/Input'
import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'
import { CloseIcon } from '@chakra-ui/icons'

type Props = {
  id: string
  imgDescription: string
  onImageDataChange(id: string, imageData: Partial<ImageData>): void
  onDelete(id: string): void
  errorMsg?: string
  img?: string
}

export function ImageUpload({
  id,
  errorMsg,
  onImageDataChange,
  onDelete,
  imgDescription,
  img = ''
}: Props) {
  const [imgUrl, setImgUrl] = useState(img)
  const fileInput = useRef<HTMLInputElement>(null)

  function uploadImage() {
    fileInput?.current.click()
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const fileList = Array.from(e.target.files)
    const file = fileList[0]
    const url = URL.createObjectURL(file)
    setImgUrl(url)
    onImageDataChange(id, { file, filename: file.name })
  }

  function handleImageDelete() {
    setImgUrl('')
    onDelete(id)
  }

  const buttonConfig = imgUrl
    ? {
        opacity: 0,
        text: 'Alterar imagem'
      }
    : {
        opacity: 1,
        text: 'Selecionar imagem'
      }

  return (
    <Stack position="relative">
      {imgUrl && (
        <Flex
          position="absolute"
          top={-2}
          right={-2}
          zIndex={2}
          borderRadius="50%"
          padding={1}
          border="1px"
          width="30px"
          height="30px"
          borderColor="gray.500"
          cursor="pointer"
          _hover={{
            borderColor: 'red.500',
            backgroundColor: 'red.50',
            color: 'red.500',
            '.icon': {
              color: 'red.500'
            }
          }}
        >
          <Center w="100%">
            <CloseIcon
              className="icon"
              color="gray.500"
              boxSize={3}
              onClick={handleImageDelete}
            />
          </Center>
        </Flex>
      )}
      <Box
        data-testid="file-upload-container"
        borderRadius={0}
        border={1}
        borderStyle="dashed"
        borderColor="purple.700"
        height={200}
        width={{ base: '100%' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        _hover={{
          '.btn-upload': {
            transition: '.2s ease-out all',
            opacity: 1,
            position: 'relative',
            zIndex: 2
          },
          '.overlay': {
            transition: '.2s ease-out all',
            backgroundColor: 'whiteAlpha.700',
            opacity: 1
          }
        }}
      >
        <Box
          className="overlay"
          opacity={0}
          height="100%"
          width="100%"
          position="absolute"
          zIndex={1}
        />
        {imgUrl && <Image src={imgUrl} alt="imagem selecionada" fill />}
        <ChakraInput
          ref={fileInput}
          data-testid="file-upload"
          accept=".jpg,.jpeg,.png"
          width="auto"
          type="file"
          border={0}
          position="absolute"
          visibility="hidden"
          onChange={handleImageChange}
        />
        <Button
          className="btn-upload"
          opacity={buttonConfig.opacity}
          variant="ghost"
          onClick={uploadImage}
        >
          {buttonConfig.text}
        </Button>
      </Box>
      {/* TODO - HANDLE DESCRIPTION ERRORS */}
      {imgUrl && (
        <FormField
          labelProps={{
            htmlFor: `description-${id}`,
            labelText: 'Descrição da imagem'
          }}
          formControlProps={{
            isInvalid: !!errorMsg
          }}
          errorMessage={errorMsg}
        >
          <Input
            id={`description-${id}`}
            name={`description-${id}`}
            value={imgDescription}
            onValueChange={(value) => onImageDataChange(id, { altText: value })}
            placeholder="Ex: Cadeira de praia listrada"
          />
        </FormField>
      )}
    </Stack>
  )
}
