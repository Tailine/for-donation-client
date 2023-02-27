import { RegisterForm } from 'components/RegisterForm'
import { makeCityService } from 'factories/makeCityService'
import { InferGetStaticPropsType } from 'next'
import { Auth } from 'templates/Auth'

export default function SignUp({
  states = []
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <Auth title="Cadastre-se e ajude a quem precisa">
      <RegisterForm states={states} />
    </Auth>
  )
}

export async function getServerSideProps() {
  try {
    const states = await makeCityService().fetchStates()
    return {
      props: {
        states
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
