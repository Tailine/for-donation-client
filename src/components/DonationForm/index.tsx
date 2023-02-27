import { Grid, GridItem, Text, Textarea } from '@chakra-ui/react'
import { FormField } from 'components/FormField'
import { Input } from 'components/Input'
import { ImageUpload } from 'components/ImageUpload'
import { InputPhone } from 'components/InputPhone'
import { Select } from 'components/Select'
import { FormEvent, useState } from 'react'
import { INVALID_EMAIL_MESSAGE } from 'utils/constants'
import { isEmail } from 'utils/isEmail'
import { isFormValid, validatePhone, validateRequired } from 'utils/validations'

export type InputFields = {
  title: string
  email: string
  category: string
  phone: string
  description: string
  images: File[]
}

type FieldErrors = Partial<Record<keyof InputFields, string>>

const initialValues = {
  title: '',
  email: '',
  category: '',
  phone: '',
  description: '',
  images: []
}

type Props = {
  categories: { id: number; name: string }[]
  submit(newDonation: InputFields): void
}

export function DonationForm({ submit, categories }: Props) {
  const [formInput, setFormInput] = useState<InputFields>(initialValues)
  const [errors, setErrors] = useState<FieldErrors>({})

  function handleInputChange(name: keyof InputFields, value: string | File[]) {
    setFormInput({ ...formInput, [name]: value })
  }

  function validateForm() {
    const titleValidation = validateRequired(
      formInput.title,
      'Insira um título'
    )
    const isValidEmail = isEmail(formInput.email)
    const categoryValidation = validateRequired(
      formInput.category,
      'Selecione uma categoria'
    )
    const phoneValidation = validatePhone(formInput.phone)
    const descriptionValidation = validateRequired(
      formInput.description,
      'Insira uma descrição'
    )

    const inputErrors: FieldErrors = {
      ...(!titleValidation.isValid && { title: titleValidation?.message }),
      ...(!isValidEmail && { email: INVALID_EMAIL_MESSAGE }),
      ...(!categoryValidation.isValid && {
        category: categoryValidation?.message
      }),
      ...(!phoneValidation.isValid && { phone: phoneValidation?.message }),
      ...(!descriptionValidation.isValid && {
        description: descriptionValidation?.message
      }),
      ...(!formInput.images.length && {
        images: 'Adicione pelo menos uma imagem'
      })
    }
    setErrors(inputErrors)
    return inputErrors
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (isFormValid(validateForm())) {
      console.log('IS VALID')
      submit(formInput)
    }
  }

  const options = categories.map((category) => ({
    label: category.name,
    value: category.id.toString()
  }))

  return (
    <form id="new-donation-form" name="new-donation-form" onSubmit={onSubmit}>
      <Grid gridGap={8} gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}>
        <FormField
          labelProps={{
            htmlFor: 'title',
            labelText: 'Título'
          }}
          formControlProps={{
            isInvalid: Boolean(errors.title)
          }}
          errorMessage={errors.title}
        >
          <Input
            id="title"
            name="title"
            onValueChange={(value) => handleInputChange('title', value)}
          />
        </FormField>

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
            id="email"
            name="email"
            onValueChange={(value) => handleInputChange('email', value)}
          />
        </FormField>

        <FormField
          labelProps={{
            htmlFor: 'category',
            labelText: 'Categoria'
          }}
          formControlProps={{
            isInvalid: Boolean(errors.category)
          }}
          errorMessage={errors.category}
        >
          <Select
            id="category"
            name="category"
            placeholder="Selecione uma categoria"
            onOptionChange={(value) => handleInputChange('category', value)}
            options={options}
          />
        </FormField>

        <FormField
          labelProps={{
            htmlFor: 'phone',
            labelText: 'Telefone'
          }}
          formControlProps={{
            isInvalid: Boolean(errors.phone)
          }}
          errorMessage={errors.phone}
        >
          <InputPhone
            id="phone"
            name="phone"
            onValueChange={(value) => handleInputChange('phone', value)}
          />
        </FormField>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormField
            labelProps={{
              htmlFor: 'description',
              labelText: 'Descrição'
            }}
            formControlProps={{
              isInvalid: Boolean(errors.description)
            }}
            errorMessage={errors.description}
          >
            <Textarea
              id="description"
              name="description"
              onChange={({ target: { value } }) =>
                handleInputChange('description', value)
              }
            />
          </FormField>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Grid
            gridGap={4}
            gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
          >
            <ImageUpload
              onImageUpload={(file) => {
                console.log('FILE')
                handleInputChange('images', [...formInput.images, file])
              }}
            />
            <ImageUpload
              onImageUpload={(file) =>
                handleInputChange('images', [...formInput.images, file])
              }
            />
            <ImageUpload
              onImageUpload={(file) =>
                handleInputChange('images', [...formInput.images, file])
              }
            />
          </Grid>
          {errors.images && <Text>{errors.images}</Text>}
        </GridItem>
      </Grid>
    </form>
  )
}
