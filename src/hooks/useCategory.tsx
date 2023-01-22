import { useQuery } from '@tanstack/react-query'
import { Category } from 'domain/types'
import { makeCategoryService } from 'factories/makeCategoryService'

const categoryService = makeCategoryService()

export function useCategory() {
  const { data, isLoading, isError, error } = useQuery<Category[], Error>({
    queryFn: () => categoryService.get(),
    queryKey: ['category']
  })
  return { data, isLoading, isError, error }
}
