import { useToast, ToastProps } from '@chakra-ui/react'

export function useCustomToast(duration = 5000) {
  const toast = useToast()
  const id = 'custom'

  function showToast(message: string, status: ToastProps['status']) {
    if (!toast.isActive(id)) {
      toast({
        description: message,
        variant: 'subtle',
        isClosable: true,
        duration,
        status,
        containerStyle: {
          backgroundColor: 'red.100',
          color: 'gray.700'
        },
        position: 'top-right',
        id
      })
    }
  }

  return { showToast }
}
