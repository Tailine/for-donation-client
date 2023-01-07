import { useMutation } from '@tanstack/react-query'
import { makeUserService } from 'factories/makeUserService'

const userService = makeUserService()

type LoginInfo = { email: string; password: string }

export function useLogin() {
  const {
    mutate: login,
    isLoading,
    isError,
    data,
    error
  } = useMutation<boolean, Error, LoginInfo>({
    mutationFn: async (loginInfo: LoginInfo) =>
      userService.login(loginInfo.email, loginInfo.password)
  })

  return { login, isLoading, isError, data, error }
}
