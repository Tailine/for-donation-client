import { Stack } from '@chakra-ui/react'
import { Heading } from 'components/Heading'
import { RegisterForm } from 'components/RegisterForm'
import { State } from 'types'
import { apiUrl } from 'utils/apiUrl'

interface Props {
  states: State[]
}

export default function SignUp({ states }: Props) {
  return (
    <Stack
      direction="column"
      spacing={12}
      paddingY={8}
      paddingX={4}
      backgroundColor="green.700"
      minHeight="100vh"
    >
      <Heading size="lg" color="yellow">
        Cadastre-se e ajude a quem precisa
      </Heading>
      <RegisterForm states={states} />
    </Stack>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`${apiUrl()}/place/state`)
  const data: { data: State[] } = await response.json()

  return {
    props: {
      states: data.data
    }
  }
}
