import { CategoryService } from './../services/category'
import { Fetch } from 'config/httpClient/fetch'
import { HttpClientPort } from 'config/httpClient/port'

export function makeCategoryService(): CategoryService {
  const httpClient: HttpClientPort = new Fetch()
  return new CategoryService(httpClient)
}
