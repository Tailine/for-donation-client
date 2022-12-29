import { Stack } from '@chakra-ui/react'
import { Button } from 'components/Button'
import { ComboboxSearch } from 'components/ComboboxSearch'
import { FormField } from 'components/FormField'
import { Input } from 'components/Input'
import { InputPhone } from 'components/InputPhone'
import { Select } from 'components/Select'
import { useCities } from 'hooks/useCities'
import { FormEvent, useEffect, useState } from 'react'
import { State } from 'domain/types'
import { sortBy } from 'utils/sortBy'
import { isEmail } from 'utils/isEmail'
import { isValidPassword } from 'utils/isValidPassword'
import { PasswordPatternMsg } from 'components/PasswordPatternMsg'
import { useRegisterUser } from 'hooks/useRegisterUser'
import { useCustomToast } from 'hooks/useCustomToast'
import { CreateAccountSuccess } from './CreateAccountSuccess'

type Props = {
  states: State[]
}

type InputFields = {
  name: string
  email: string
  phone: string
  state: string
  city: string
  password: string
  confirmPassword: string
}

const initalValues = {
  name: '',
  email: '',
  phone: '',
  state: '',
  city: '',
  password: '',
  confirmPassword: ''
}

type FieldErrors = Partial<Record<keyof InputFields, string>> &
  Partial<{
    isPasswordPatternValid: boolean
    hasMatchingPasswords: string
  }>

function validateName(name: string) {
  if (name.length < 2) {
    return { isValid: false, message: 'Nome deve ter pelo menos 2 caracteres' }
  }

  if (/\d/.test(name)) {
    return { isValid: false, message: 'Insira apenas letras' }
  }

  return { isValid: true }
}

function validatePhone(phone: string) {
  if (![10, 11].includes(phone.length)) {
    return {
      isValid: false,
      message: 'Número de telefone inválido'
    }
  }

  return { isValid: true }
}

function validateRequired(value: string, errorMessage: string) {
  if (value) {
    return { isValid: true }
  }

  return { isValid: false, message: errorMessage }
}

export function RegisterForm({ states }: Props) {
  const [selectedState, setSelectedState] = useState('')
  const [formInput, setFormInput] = useState<InputFields>(initalValues)
  const [errors, setErrors] = useState<FieldErrors>({})
  const { data, isError, isLoading } = useCities(selectedState, !!selectedState)
  const {
    data: registerUserData,
    isError: isErrorRegisterUser,
    isLoading: isLoadingRegisterUser,
    registerUser
  } = useRegisterUser()
  const { showToast } = useCustomToast({})

  function validateFormInput() {
    const nameValidation = validateName(formInput.name)
    const isEmailValid = isEmail(formInput.email)
    const phoneValidation = validatePhone(formInput.phone)
    const stateValidation = validateRequired(
      formInput.state,
      'Estado obrigatório'
    )
    const cityValidation = validateRequired(
      formInput.city,
      'Cidade obrigatória'
    )
    const passwordValidation = validateRequired(
      formInput.password,
      'Digite uma senha'
    )

    let isPatternValid
    if (passwordValidation.isValid) {
      isPatternValid = isValidPassword(formInput.password)
    }

    const confirmPasswordValidation = validateRequired(
      formInput.confirmPassword,
      'Repita a senha'
    )

    const formInputError: FieldErrors = {
      ...(!nameValidation.isValid && { name: nameValidation.message }),
      ...(!isEmailValid && { email: 'Email inválido' }),
      ...(!phoneValidation.isValid && { phone: phoneValidation.message }),
      ...(!stateValidation.isValid && { state: stateValidation.message }),
      ...(!cityValidation.isValid && { city: cityValidation.message }),
      ...(!isPatternValid && { isPasswordPatternValid: isPatternValid }),
      ...(!passwordValidation.isValid && {
        password: passwordValidation.message
      }),
      ...(isPatternValid === false && {
        password: 'Senha inválida'
      }),
      ...(!cityValidation.isValid && { city: cityValidation.message }),
      ...(!confirmPasswordValidation.isValid && {
        confirmPassword: confirmPasswordValidation.message
      }),
      ...(confirmPasswordValidation.isValid &&
        !(formInput.confirmPassword === formInput.password) && {
          hasMatchingPasswords: 'Senhas não coincidem'
        })
    }
    setErrors(formInputError)

    return formInputError
  }

  function isFormInputValid() {
    return !Object.keys(validateFormInput()).length
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (isFormInputValid()) {
      registerUser({
        name: formInput.name,
        email: formInput.email,
        phone: formInput.phone,
        city: formInput.city,
        state: formInput.state,
        password: formInput.password
      })
    }
  }

  function handleInputChange(
    input: Partial<Record<keyof InputFields, string>>
  ) {
    setFormInput({ ...formInput, ...input })
  }

  useEffect(() => {
    if (isErrorRegisterUser) {
      showToast('Erro ao criar conta, tente novamente mais tarde', 'error')
    }
  }, [isErrorRegisterUser])

  const stateOptions = states
    .sort((a, b) => sortBy<State>(a, b, 'name'))
    .map((state) => ({
      value: state.acronym,
      label: state.name
    }))

  const cityOptions =
    isLoading || isError
      ? []
      : data.map((city) => ({ label: city.name, value: city.name }))

  if (registerUserData) {
    return <CreateAccountSuccess />
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={isLoadingRegisterUser}>
        <Stack
          direction="column"
          spacing={6}
          backgroundColor="yellow.50"
          padding={4}
        >
          <FormField
            formControlProps={{
              isInvalid: Boolean(errors?.name)
            }}
            errorMessage={errors?.name}
            labelProps={{
              htmlFor: 'name',
              labelText: 'Nome'
            }}
          >
            <Input
              id="name"
              name="name"
              onValueChange={(value) => handleInputChange({ name: value })}
            />
          </FormField>

          <FormField
            formControlProps={{
              isInvalid: Boolean(errors?.email)
            }}
            errorMessage={errors?.email}
            labelProps={{
              htmlFor: 'email',
              labelText: 'Email'
            }}
          >
            <Input
              id="email"
              name="email"
              onValueChange={(value) => handleInputChange({ email: value })}
            />
          </FormField>

          <FormField
            formControlProps={{
              isInvalid: Boolean(errors?.phone)
            }}
            errorMessage={errors?.phone}
            labelProps={{
              htmlFor: 'phone',
              labelText: 'Telefone'
            }}
          >
            <InputPhone
              id="phone"
              name="phone"
              onValueChange={(value) => handleInputChange({ phone: value })}
            />
          </FormField>
          <FormField
            formControlProps={{
              isInvalid: Boolean(errors?.state)
            }}
            errorMessage={errors?.state}
            labelProps={{
              htmlFor: 'state',
              labelText: 'Estado'
            }}
          >
            <Select
              placeholder="Selecione um estado"
              id="state"
              name="state"
              value={formInput.state}
              options={stateOptions}
              onOptionChange={(value) => {
                handleInputChange({ state: value, city: '' })
                setSelectedState(value)
              }}
            />
          </FormField>
          <FormField
            formControlProps={{
              isInvalid: Boolean(errors?.city)
            }}
            errorMessage={errors?.city}
            labelProps={{
              htmlFor: 'city',
              labelText: 'Cidade'
            }}
          >
            <ComboboxSearch
              key={selectedState}
              placeholder="Selecione uma cidade"
              id="city"
              name="city"
              ariaLabel="Cidade"
              isDisabled={isLoading}
              isInvalid={Boolean(errors?.city)}
              options={cityOptions}
              onChange={(value) => handleInputChange({ city: value })}
            />
          </FormField>
          <FormField
            formControlProps={{
              isInvalid: Boolean(errors?.password)
            }}
            errorMessage={errors?.password}
            labelProps={{
              htmlFor: 'password',
              labelText: 'Senha'
            }}
          >
            <Input
              value={formInput.password}
              data-testid="input-password"
              id="password"
              type="password"
              name="password"
              onValueChange={(value) => handleInputChange({ password: value })}
            />
          </FormField>
          <FormField
            formControlProps={{
              isInvalid:
                Boolean(errors?.confirmPassword) ||
                Boolean(errors?.hasMatchingPasswords)
            }}
            errorMessage={
              errors?.confirmPassword || errors?.hasMatchingPasswords
            }
            labelProps={{
              htmlFor: 'confirmPassword',
              labelText: 'Confirmar senha'
            }}
          >
            <Input
              data-testid="input-confirm-password"
              value={formInput.confirmPassword}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              onValueChange={(value) =>
                handleInputChange({ confirmPassword: value })
              }
            />
          </FormField>
          {errors?.isPasswordPatternValid === false && <PasswordPatternMsg />}

          <Button type="submit" isLoading={isLoadingRegisterUser}>
            Criar
          </Button>
        </Stack>
      </fieldset>
    </form>
  )
}
