import { Box, Input } from '@chakra-ui/react'
import { Button } from 'components/Button'
import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'

type Props = {
  onImageUpload(file: File): void
  img?: string
}

export function ImageUpload({ onImageUpload, img = '' }: Props) {
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
    onImageUpload(file)
  }

  const buttonConfig = imgUrl
    ? {
        opacity: 0,
        text: 'Alterar imagem'
      }
    : {
        opacity: 1,
        text: 'Selecione uma imagem'
      }

  return (
    <Box
      data-testid="file-upload-container"
      borderRadius={0}
      border={1}
      borderStyle="dashed"
      borderColor="purple.700"
      height={200}
      width={{ base: '100%', md: 300 }}
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
      <Input
        ref={fileInput}
        data-testid="file-upload"
        accept=".jpg,.jpeg"
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
  )
}
