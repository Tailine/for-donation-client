import { useMutation } from '@tanstack/react-query'
import { makeUserService } from 'factories/makeUserService'
import { NewUser } from 'services/user'

const userService = makeUserService()

export function useRegisterUser() {
  const {
    mutate: registerUser,
    isLoading,
    isError,
    data,
    error
  } = useMutation<{ message: string }, Error, NewUser>({
    mutationFn: async (newUserData: NewUser) =>
      userService.registerUser(newUserData)
  })

  return { registerUser, isLoading, isError, data, error }
}
