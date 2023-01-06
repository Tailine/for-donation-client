import { Fetch } from 'config/httpClient'
import { HttpClientPort } from 'config/httpClient/port'
import { UserService } from 'services/user'

export function makeUserService(): UserService {
  const httpClient: HttpClientPort = new Fetch()
  return new UserService(httpClient)
}
