import { Button } from 'components/Button'
import { DonationForm, InputFields } from 'components/DonationForm'
import { Modal } from 'components/Modal'
import { useCategory } from 'hooks/useCategory'
import { useCustomToast } from 'hooks/useCustomToast'
import { useNewDonation } from 'hooks/useNewDonation'
import { useState } from 'react'
import { DonationData } from 'services/donation'

type Props = {
  userId?: string
}

export function NewDonation({ userId }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    data: categoryData,
    isError: isErrorCategory,
    error: categoryError,
    isLoading
  } = useCategory()
  const {
    createDonation,
    isSuccess: isCreateSuccess,
    isError: isErrorCreateDonation,
    reset: resetCreateDonation
  } = useNewDonation()
  const { showToast } = useCustomToast()

  // get categories
  // call api
  // format before calling api

  function submit(data: InputFields) {
    const { category, description, email, images, phone, title } = data
    // const donationData: DonationData = {
    //   userId,
    //   categoryId: category,
    //   ...restDonationData
    // }

    // console.log({ donationData })

    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('categoryId', category)
    images.forEach((img) => formData.append('images', img))
    console.log(formData.get('images'))
    createDonation(formData)
  }

  if (!userId) return null

  const categories = isLoading || isErrorCategory ? [] : categoryData

  if (categoryError) {
    showToast(categoryError.message, 'error')
  }

  if (isCreateSuccess) {
    showToast('Doação criada com sucesso!', 'success')
    setIsOpen(false)
    resetCreateDonation()
  }

  if (isErrorCreateDonation) {
    showToast('Erro ao criar doação.', 'error')
    resetCreateDonation()
  }

  // console.log({ isCreateSuccess, isErrorCreateDonation })

  return (
    <>
      <Button
        fontWeight="normal"
        fontSize="md"
        onClick={() => setIsOpen(!isOpen)}
      >
        Nova doação
      </Button>
      <Modal
        data-testid="modal-donation-form"
        // isOpen
        isOpen={isOpen}
        title="Nova doação"
        footer={
          <>
            <Button
              marginRight={6}
              variant="outlined"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" form="new-donation-form">
              Confirmar
            </Button>
          </>
        }
      >
        <DonationForm submit={submit} categories={categories} />
      </Modal>
    </>
  )
}
