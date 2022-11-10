import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  colors: {
    green: {
      '50': '#F0F5F4',
      '100': '#D5E2E0',
      '200': '#B9CFCC',
      '300': '#9EBDB8',
      '400': '#83AAA4',
      '500': '#59837c',
      '600': '#43645f',
      '700': '#3E5B56',
      '800': '#293D39',
      '900': '#151E1D',
    },
    yellow: {
      '50': '#FEF6E6',
      '100': '#f9d99d',
      '200': '#FBD68E',
      '300': '#FAC561',
      '400': '#F8B535',
      '500': '#F6A509',
      '600': '#C58407',
      '700': '#946305',
      '800': '#634203',
      '900': '#312102',
    },
    red: {
      '50': '#F8EDED',
      '100': '#EACDCD',
      '200': '#DDACAC',
      '300': '#CF8C8C',
      '400': '#C26B6B',
      '500': '#B44B4B',
      '600': '#903C3C',
      '700': '#6C2D2D',
      '800': '#481E1E',
      '900': '#240F0F',
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
