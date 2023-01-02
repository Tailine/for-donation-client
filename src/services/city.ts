import { City } from 'domain/types'
import { apiUrl } from 'utils/apiUrl'

function isCity(data: unknown[]): data is City[] {
  return data.every(
    (item) =>
      (item as City).id !== undefined && (item as City).name !== undefined
  )
}
export class CityService {
  static async fetchCities(stateId: string): Promise<City[]> {
    const response = await fetch(`${apiUrl()}/place/cities/${stateId}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error('Algo deu errado.')
    }

    if (data instanceof Array && data.length && isCity(data)) {
      return data
    }

    return []
  }
}
