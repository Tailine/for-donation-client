import { Box, Link, Stack, Text } from '@chakra-ui/react'
import { Button } from 'components/Button'
import { FormField } from 'components/FormField'
import { Input } from 'components/Input'
import { useCustomToast } from 'hooks/useCustomToast'
import { useLogin } from 'hooks/useLogin'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { isEmail } from 'utils/isEmail'
import { validateRequired } from 'utils/validations'
import NextLink from 'next/link'

type FormInput = {
  email: string
  password: string
}

const initialValues = {
  email: '',
  password: ''
}

type FieldErrors = Partial<FormInput>

export function LoginForm() {
  const [formInput, setFormInput] = useState<FormInput>(initialValues)
  const [errors, setErrors] = useState<FieldErrors>({})
  const { login, data, isLoading, isError, error } = useLogin()
  const { showToast } = useCustomToast()
  const router = useRouter()

  function handleInputChange(name: keyof FormInput, value: string) {
    setFormInput({ ...formInput, [name]: value })
  }

  function validateFormInput() {
    const passwordValidation = validateRequired(
      formInput.password,
      'Insira a senha'
    )
    const isEmailValid = isEmail(formInput.email)

    const inputErrors: FieldErrors = {
      ...(!passwordValidation.isValid && {
        password: passwordValidation?.message
      }),
      ...(!isEmailValid && { email: 'Email inválido' })
    }

    setErrors(inputErrors)
    return inputErrors
  }

  function isFormValid() {
    return !Object.keys(validateFormInput()).length
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (isFormValid()) {
      const { email, password } = formInput
      login({ email, password })
    }
  }

  if (data) router.push('/doacoes')
  if (isError) showToast(error.message, 'error')

  return (
    <form name="login form" onSubmit={onSubmit}>
      <Box
        display={{ base: 'block', lg: 'flex' }}
        justifyContent={{ base: 'stretch', xl: 'center' }}
        alignItems={{ base: 'flex-start', xl: 'center' }}
      >
        <Stack
          justifyContent="center"
          height={{ base: '100%', lg: '100vh' }}
          paddingX={{ base: 4, md: 20, lg: 12, xl: 0 }}
          paddingY={12}
          spacing={8}
          width={{ base: '100%', xl: '70%', '4k': '50%' }}
        >
          <fieldset disabled={isLoading}>
            <FormField
              labelProps={{
                htmlFor: 'email',
                labelText: 'Email'
              }}
              formControlProps={{
                isInvalid: Boolean(errors.email)
              }}
              errorMessage={errors.email}
            >
              <Input
                aria-required="true"
                value={formInput.email}
                id="email"
                name="email"
                onValueChange={(value) => handleInputChange('email', value)}
              />
            </FormField>
            <FormField
              labelProps={{
                htmlFor: 'password',
                labelText: 'Senha'
              }}
              formControlProps={{
                isInvalid: Boolean(errors.password)
              }}
              errorMessage={errors.password}
            >
              <Input
                aria-required="true"
                value={formInput.password}
                data-testid="input-password"
                id="password"
                name="password"
                onValueChange={(value) => handleInputChange('password', value)}
                type="password"
              />
            </FormField>
          </fieldset>
          <Box>
            <Button type="submit" isLoading={isLoading} w="100%">
              Entrar
            </Button>
            <Text
              color="gray.600"
              fontSize={12}
              textAlign="center"
              marginTop={4}
            >
              Ainda não possui conta?{' '}
              <Link
                as={NextLink}
                href="/sign-up"
                textAlign="center"
                color="yellow.400"
              >
                Cadastre-se
              </Link>
            </Text>
          </Box>
        </Stack>
      </Box>
    </form>
  )
}
