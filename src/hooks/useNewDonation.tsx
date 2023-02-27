import { useMutation } from '@tanstack/react-query'
import { makeDonationService } from 'factories/makeDonationService'
import { DonationData } from 'services/donation'

const donationService = makeDonationService()

export function useNewDonation() {
  const {
    mutate: createDonation,
    isLoading,
    isError,
    error,
    isSuccess,
    reset
  } = useMutation<void, Error, FormData>({
    mutationFn: async (formData: FormData) =>
      donationService.createDonation(formData)
  })

  return { createDonation, isLoading, isError, isSuccess, error, reset }
}
