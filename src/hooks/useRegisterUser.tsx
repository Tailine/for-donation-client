import { useMutation } from '@tanstack/react-query'
import { NewUser, UserService } from 'services/user'

export function useRegisterUser() {
  const {
    mutate: registerUser,
    isLoading,
    isError,
    data
  } = useMutation({
    mutationFn: async (newUserData: NewUser) =>
      UserService.registerUser(newUserData)
  })

  return { registerUser, isLoading, isError, data }
}
