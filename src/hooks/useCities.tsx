import { useQuery } from '@tanstack/react-query'
import { City } from 'domain/types'
import { makeCityService } from 'factories/makeCityService'

const cityService = makeCityService()

export function useCities(stateId: string, isQueryEnabled: boolean) {
  const { data, isLoading, isError, error } = useQuery<City[], Error>({
    queryFn: () => cityService.fetchCities(stateId),
    queryKey: ['city', stateId],
    enabled: isQueryEnabled
  })
  return { data, isLoading, isError, error }
}
