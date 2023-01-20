import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithQueryClient } from 'utils/renderWithQueryClient'
import { DonationForm } from '.'

const mockCategories = [
  { id: 1, name: 'Eletrodoméstico' },
  { id: 2, name: 'Veículos' }
]

function renderComponent(submitFn: jest.Mock = jest.fn()) {
  return renderWithQueryClient(
    <DonationForm submit={submitFn} categories={mockCategories} />
  )
}

describe('<DonationForm />', () => {
  it('renders correctly', () => {
    renderComponent()

    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /título/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', { name: /categoria/i })
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /descrição/i })
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('img-upload')).toHaveLength(3)
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })

  it('should validate form and display errors', async () => {
    renderComponent()

    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(screen.getByText('Insira um título')).toBeInTheDocument()
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
      expect(screen.getByText('Selecione uma categoria')).toBeInTheDocument()
      expect(
        screen.getByText('Número de telefone inválido')
      ).toBeInTheDocument()
      expect(screen.getByText('Insira uma descrição')).toBeInTheDocument()
      expect(
        screen.getByText('Adicione pelo menos uma imagem')
      ).toBeInTheDocument()
    })
  })

  it('should submit form', async () => {
    const file = [new File(['hello'], 'hello.png', { type: 'image/png' })]
    const submitFn = jest.fn()
    renderComponent(submitFn)

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
    await userEvent.upload(screen.getAllByTestId(/img-upload/i)[0], file)

    fireEvent.submit(screen.getByRole('form'))

    expect(submitFn).toHaveBeenCalled()
    expect(submitFn).toHaveBeenCalledTimes(1)
  })
})
