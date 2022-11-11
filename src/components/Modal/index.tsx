import {
  Button,
  Modal as ChackraModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export type Props = {
  title: string
  content: ReactNode
  isOpen: boolean
  onConfirm(): void
  onCancel(): void
}

export function Modal({ title, content, isOpen, onCancel, onConfirm }: Props) {
  return (
    <ChackraModal
      isOpen={isOpen}
      onClose={() => {
        return
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>

        <ModalFooter>
          <Button variant="outlined" colorScheme="green" onClick={onCancel}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={onConfirm}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChackraModal>
  )
}
