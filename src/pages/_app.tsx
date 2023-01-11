import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from 'config/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Bebas_Neue } from '@next/font/google'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] })
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <main className={bebas.className}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
