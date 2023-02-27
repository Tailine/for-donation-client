import { isOfType } from 'utils/isOfType'
import { HttpClientPort } from 'config/httpClient/port'
import { Donation } from 'domain/types'

export type DonationData = {
  userId: string
  title: string
  email: string
  categoryId: string
  phone: string
  description: string
  images: File[]
}

export class DonationService {
  constructor(private readonly httpClient: HttpClientPort) {}

  async createDonation(formData: FormData) {
    await this.httpClient.post('/donations', formData)
  }

  async getDonations(): Promise<Donation[]> {
    const data = await this.httpClient.get('/donations')
    if (
      !isOfType<Donation[]>(data, [
        'id',
        'title',
        'email',
        'phone',
        'description',
        'images',
        'category'
      ])
    ) {
      throw new Error('Not of type Donation')
    }
    // TODO: formatar resposta
    return data
  }
}
