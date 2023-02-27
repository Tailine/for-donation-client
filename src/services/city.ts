import { HttpClientPort } from 'config/httpClient/port'
import { City, State } from 'domain/types'
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants'
import { isOfType } from 'utils/isOfType'

export class CityService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async fetchStates(): Promise<State[]> {
    const data = await this.httpClient.get(`/places/state`)

    if (!isOfType<State[]>(data, ['acronym', 'id', 'name'])) {
      throw new Error(DEFAULT_ERROR_MESSAGE)
    }

    return data
  }

  async fetchCities(stateId: string): Promise<City[]> {
    const data = await this.httpClient.get(`/places/cities/${stateId}`)

    if (!isOfType<City[]>(data, ['id', 'name'])) {
      throw new Error(DEFAULT_ERROR_MESSAGE)
    }

    return data
  }
}
