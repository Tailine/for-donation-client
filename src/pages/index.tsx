import { LoginForm } from 'components/LoginForm'
import { Auth } from 'templates/Auth'

export default function SignIn() {
  return (
    <Auth title="Efetue o login para continuar doando.">
      <LoginForm />
    </Auth>
  )
}
