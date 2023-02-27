import { Fetch } from 'config/httpClient/fetch'
import { HttpClientPort } from 'config/httpClient/port'
import { DonationService } from 'services/donation'

export function makeDonationService(): DonationService {
  const httpClient: HttpClientPort = new Fetch()
  return new DonationService(httpClient)
}
