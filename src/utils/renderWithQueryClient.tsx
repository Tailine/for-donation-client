import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'

export function renderWithQueryClient(children: ReactNode) {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
