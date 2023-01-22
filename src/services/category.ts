import { HttpClientPort } from 'config/httpClient/port'
import { Category } from 'domain/types'
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants'
import { isOfType } from 'utils/isOfType'

export class CategoryService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async get(): Promise<Category[]> {
    const data = await this.httpClient.get('/categories')

    if (!isOfType<Category[]>(data, ['id', 'name'])) {
      throw new Error(DEFAULT_ERROR_MESSAGE)
    }

    return data
  }
}
