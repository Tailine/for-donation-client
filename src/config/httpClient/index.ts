import { ErrorResponse } from 'domain/types'
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants'
import { isOfType } from 'utils/isOfType'
import { HttpClientPort } from './port'

export class Fetch implements HttpClientPort {
  private defaultOptions: RequestInit = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }

  async get(endpoint: string): Promise<any> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      this.defaultOptions
    )

    await Fetch.checkForError(response)

    return response.json()
  }

  async post(endpoint: string, body: any): Promise<any> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        ...this.defaultOptions
      }
    )

    await Fetch.checkForError(response)

    return response.json()
  }

  static async checkForError(response: Response) {
    if (!response.ok) {
      const error = await response.json()
      if (isOfType<ErrorResponse>(error, ['message'])) {
        throw new Error(error.message)
      }
      throw new Error(DEFAULT_ERROR_MESSAGE)
    }
  }
}
