import { Fetch } from 'config/httpClient'
import { HttpClientPort } from 'config/httpClient/port'
import { CityService } from 'services/city'

export function makeCityService(): CityService {
  const httpClient: HttpClientPort = new Fetch()
  return new CityService(httpClient)
}
