import { isOfType } from 'utils/isOfType'
import { HttpClientPort } from 'config/httpClient/port'
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants'

export type NewUser = {
  name: string
  email: string
  phone: string
  city: string
  state: string
  password: string
}

export class UserService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async registerUser(
    newUser: NewUser
  ): Promise<{ message: string } | undefined> {
    const data = await this.httpClient.post('/user/sign-up', newUser)

    if (!isOfType<{ message: string }>(data, ['message'])) {
      throw new Error(DEFAULT_ERROR_MESSAGE)
    }

    return data
  }

  async login(email: string, password: string): Promise<boolean> {
    const data = await this.httpClient.post('/user/sign-in', {
      email,
      password
    })

    return isOfType<{ message: string }>(data, ['message'])
  }
}
