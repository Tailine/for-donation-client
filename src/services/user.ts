import { apiUrl } from 'utils/apiUrl'

export type NewUser = {
  name: string
  email: string
  phone: string
  city: string
  state: string
  password: string
}

export class UserService {
  static async registerUser(
    newUser: NewUser
  ): Promise<{ message: string } | undefined> {
    const response = await fetch(`${apiUrl()}/user/sign-up`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    if (typeof data === 'object' && 'message' in data) {
      return data
    }

    return undefined
  }
}
