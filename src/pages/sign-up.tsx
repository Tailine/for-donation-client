import { RegisterForm } from 'components/RegisterForm'
import { State } from 'domain/types'
import { InferGetStaticPropsType } from 'next'
import { Auth } from 'templates/Auth'
import { apiUrl } from 'utils/apiUrl'

export default function SignUp({
  states = []
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <Auth title="Cadastre-se e ajude a quem precisa">
      <RegisterForm states={states} />
    </Auth>
  )
}

function isState(data: any[]): data is State[] {
  return data.every(
    (item) =>
      (item as State).acronym && (item as State).id && (item as State).name
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${apiUrl()}/place/state`)
    const data = await response.json()

    if (data instanceof Array && isState(data)) {
      return {
        props: {
          states: data
        }
      }
    }
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      states: []
    }
  }
}
