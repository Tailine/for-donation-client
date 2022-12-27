import { City } from 'domain/types'
import { apiUrl } from 'utils/apiUrl'

export class CityService {
  static async fetchCities(stateId: string): Promise<City[]> {
    try {
      const response = await fetch(`${apiUrl()}/place/cities/${stateId}`)
      const data: { data: City[] } = await response.json()

      if (response.status !== 200) {
        throw new Error('Algo deu errado.')
      }

      return data.data
    } catch {
      throw new Error('Algo deu errado.')
    }
  }
}
