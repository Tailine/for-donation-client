import { Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import { Button } from 'components/Button'
import { ComboboxSearch } from 'components/ComboboxSearch'
import { FormField } from 'components/FormField'
import { Input } from 'components/Input'
import { InputPhone } from 'components/InputPhone'
import { Select } from 'components/Select'
import { useCities } from 'hooks/useCities'
import { FormEvent, useState } from 'react'
import { State } from 'domain/types'
import { sortBy } from 'utils/sortBy'
import { isEmail } from 'utils/isEmail'
import { isValidPassword } from 'utils/isValidPassword'
import { PasswordPatternMsg } from 'components/PasswordPatternMsg'
import { useRegisterUser } from 'hooks/useRegisterUser'
import { useCustomToast } from 'hooks/useCustomToast'
import { CreateAccountSuccess } from './CreateAccountSuccess'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import {
  isFormValid,
  validateHasOnlyLetters,
  validateName,
  validatePhone,
  validateRequired
} from 'utils/validations'
import { INVALID_EMAIL_MESSAGE } from 'utils/constants'

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

export function RegisterForm({ states }: Props) {
  const [selectedState, setSelectedState] = useState('')
  const [formInput, setFormInput] = useState<InputFields>(initalValues)
  const [errors, setErrors] = useState<FieldErrors>({})
  const { data, isError, isLoading } = useCities(selectedState, !!selectedState)
  const {
    data: registerUserData,
    isError: isErrorRegisterUser,
    isLoading: isLoadingRegisterUser,
    error,
    registerUser
  } = useRegisterUser()
  const { showToast } = useCustomToast()

  function validateFormInput() {
    const nameValidation = validateName(formInput.name)
    const nameOnlyLettersValidation = validateHasOnlyLetters(formInput.name)
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
      ...(!nameValidation.isValid && { name: nameValidation?.message }),
      ...(!nameOnlyLettersValidation.isValid && {
        name: nameOnlyLettersValidation?.message
      }),
      ...(!isEmailValid && { email: INVALID_EMAIL_MESSAGE }),
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

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (isFormValid(validateFormInput())) {
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

  if (isErrorRegisterUser) {
    showToast(error.message, 'error')
  }

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
          justifyContent="center"
          height={{ base: '100%', lg: '100vh' }}
          paddingX={{ base: 4, md: 8, lg: 12 }}
          paddingY={12}
        >
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gridGap={8}
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
                value={formInput.name}
                onValueChange={(value) => handleInputChange({ name: value })}
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
                value={formInput.phone}
                onValueChange={(value) => handleInputChange({ phone: value })}
              />
            </FormField>

            <GridItem colSpan={{ base: 1, md: 2 }}>
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
                  value={formInput.email}
                  onValueChange={(value) => handleInputChange({ email: value })}
                />
              </FormField>
            </GridItem>

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
                onValueChange={(value) =>
                  handleInputChange({ password: value })
                }
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

            <GridItem colStart={{ base: 1, md: 2 }} colEnd={{ base: 1, md: 2 }}>
              <Button
                type="submit"
                isLoading={isLoadingRegisterUser}
                width="100%"
              >
                Criar
              </Button>
              <Text
                color="gray.600"
                fontSize={12}
                textAlign="center"
                marginTop={4}
              >
                Já possui conta?{' '}
                <Link
                  as={NextLink}
                  href="/"
                  textAlign="center"
                  color="yellow.400"
                >
                  Efetuar login
                </Link>
              </Text>
            </GridItem>
          </Grid>
        </Stack>
      </fieldset>
    </form>
  )
}
