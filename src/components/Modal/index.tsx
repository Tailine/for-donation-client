import {
  Modal as ChackraModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export type Props = {
  title: string
  content: ReactNode
  isOpen: boolean
  footer?: JSX.Element
}

export function Modal({ title, content, isOpen, footer }: Props) {
  const { onClose } = useDisclosure()
  return (
    <ChackraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={0}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </ChackraModal>
  )
}
