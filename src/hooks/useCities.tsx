import { useQuery } from '@tanstack/react-query'
import { CityService } from 'services/city'

export function useCities(stateId: string, isQueryEnabled: boolean) {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => CityService.fetchCities(stateId),
    queryKey: ['city', stateId],
    enabled: isQueryEnabled
  })
  return { data, isLoading, isError }
}
