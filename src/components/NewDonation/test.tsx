import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNewDonation } from 'hooks/useNewDonation'
import { useCustomToast } from 'hooks/useCustomToast'
import { renderWithQueryClient } from 'utils/renderWithQueryClient'
import { NewDonation } from '.'

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(() => 'http://fake-image-url')
})

const mockCategories = [
  { id: 1, name: 'Veículos' },
  { id: 2, name: 'Móveis' }
]

jest.mock('../../hooks/useCustomToast.tsx', () => ({
  useCustomToast: jest.fn(() => ({
    showToast: jest.fn()
  }))
}))

jest.mock('../../hooks/useCategory.tsx', () => ({
  useCategory: jest.fn(() => ({
    data: mockCategories,
    isLoading: false,
    isError: false,
    error: undefined
  }))
}))

jest.mock('../../hooks/useNewDonation.tsx', () => ({
  useNewDonation: jest.fn(() => ({
    createDonation: jest.fn(),
    isLoading: undefined,
    isError: undefined,
    isSuccess: undefined,
    error: undefined,
    reset: jest.fn()
  }))
}))

async function fillOutForm() {
  const file = [new File(['hello'], 'hello.jpg', { type: 'image/jpg' })]
  await userEvent.type(
    screen.getByRole('textbox', { name: /título/i }),
    'Roupas gap'
  )
  await userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    'maria@gmail.com'
  )
  await userEvent.type(
    screen.getByRole('textbox', { name: /telefone/i }),
    '71999999999'
  )
  await userEvent.selectOptions(
    screen.getByRole('combobox', { name: /categoria/i }),
    'Veículos'
  )
  await userEvent.type(
    screen.getByRole('textbox', { name: /descrição/i }),
    'Roupas em ótimo estado.'
  )
  await userEvent.upload(screen.getAllByTestId('file-upload')[0], file)
}

describe('<NewDonation />', () => {
  beforeEach(() => {
    renderWithQueryClient(<NewDonation />)
  })

  it('renders correctly', () => {
    expect(screen.queryByTestId('modal-donation-form')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /nova doação/i })
    ).toBeInTheDocument()
  })

  it('should display modal with form', async () => {
    userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByRole('form')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /cancelar/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /confirmar/i })
      ).toBeInTheDocument()
    })
  })

  it('should close modal', async () => {
    userEvent.click(screen.getByRole('button', { name: /nova doação/i }))

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should successfully submit form', async () => {
    const createDonation = jest.fn()
    ;(useNewDonation as jest.Mock).mockImplementation(() => ({
      createDonation,
      reset: jest.fn(),
      isSuccess: undefined,
      isError: false,
      isLoading: false,
      error: undefined
    }))
    userEvent.click(screen.getByRole('button', { name: /nova doação/i }))

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    await fillOutForm()
    await userEvent.click(screen.getByRole('button', { name: /confirmar/i }))

    await waitFor(() => {
      expect(createDonation).toHaveBeenCalled()
    })
  })

  it('should display confirmation toast and reset mutation', async () => {
    const showToast = jest.fn()
    const reset = jest.fn()
    ;(useCustomToast as jest.Mock).mockImplementation(() => ({
      showToast
    }))
    ;(useNewDonation as jest.Mock).mockImplementationOnce(() => ({
      createDonation: jest.fn(),
      reset,
      isSuccess: true,
      isError: false,
      isLoading: false,
      error: undefined
    }))
    userEvent.click(screen.getByRole('button', { name: /nova doação/i }))

    await waitFor(() => {
      expect(reset).toHaveBeenCalled()
      expect(showToast).toHaveBeenCalled()
      expect(showToast).toHaveBeenCalledWith(
        'Doação criada com sucesso!',
        'success'
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
