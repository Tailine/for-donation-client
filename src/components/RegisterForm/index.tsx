import { Stack } from '@chakra-ui/react'
import { Button } from 'components/Button'
import { ComboboxSearch } from 'components/ComboboxSearch'
import { FormField } from 'components/FormField'
import { Heading } from 'components/Heading'
import { Input } from 'components/Input'
import { InputPhone } from 'components/InputPhone'
import { Select } from 'components/Select'
import { useState } from 'react'

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

export function RegisterForm() {
  const [formInput, setFormInput] = useState<InputFields>(initalValues)

  function onSubmit() {
    // validate form
  }

  function handleInputChange(name: keyof InputFields, value: string) {
    setFormInput({ ...formInput, [name]: value })
  }

  console.log({ formInput })

  return (
    <form onSubmit={onSubmit}>
      <Stack
        direction="column"
        spacing={6}
        backgroundColor="yellow.50"
        padding={4}
      >
        <Heading>Criar conta</Heading>
        <FormField
          labelProps={{
            htmlFor: 'name',
            labelText: 'Nome'
          }}
        >
          <Input
            id="name"
            name="name"
            onValueChange={(value) => handleInputChange('name', value)}
          />
        </FormField>
        <FormField
          labelProps={{
            htmlFor: 'email',
            labelText: 'Email'
          }}
        >
          <Input
            id="email"
            name="email"
            onValueChange={(v) => console.log(v)}
          />
        </FormField>
        <FormField
          labelProps={{
            htmlFor: 'phone',
            labelText: 'Telefone'
          }}
        >
          <InputPhone
            id="phone"
            name="phone"
            onValueChange={(value) => handleInputChange('phone', value)}
          />
        </FormField>
        <FormField
          labelProps={{
            htmlFor: 'state',
            labelText: 'Estado'
          }}
        >
          {/* get options from api */}
          <Select
            id="state"
            name="state"
            options={[]}
            onOptionChange={(value) => handleInputChange('city', value)}
          />
        </FormField>
        <FormField
          labelProps={{
            htmlFor: 'city',
            labelText: 'Cidade'
          }}
        >
          <ComboboxSearch
            id="city"
            name="city"
            options={[]}
            onChange={(value) => handleInputChange('city', value)}
          />
        </FormField>
        <FormField
          labelProps={{
            htmlFor: 'password',
            labelText: 'Senha'
          }}
        >
          <Input
            value={formInput.password}
            id="password"
            type="password"
            name="password"
            onValueChange={(value) => handleInputChange('password', value)}
          />
        </FormField>
        <FormField
          labelProps={{
            htmlFor: 'confirmPassword',
            labelText: 'Confirmar senha'
          }}
        >
          <Input
            value={formInput.confirmPassword}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onValueChange={(value) =>
              handleInputChange('confirmPassword', value)
            }
          />
        </FormField>
        <Button>Confirmar</Button>
      </Stack>
    </form>
  )
}
