import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { State } from 'domain/types'
import { renderWithQueryClient } from 'utils/renderWithQueryClient'
import { RegisterForm } from '.'
import { useCities } from '../../hooks/useCities'
import { useRegisterUser } from '../../hooks/useRegisterUser'
import { useCustomToast } from 'hooks/useCustomToast'

jest.mock('../../hooks/useCities', () => ({
  useCities: jest.fn(() => ({
    data: undefined,
    isLoading: true,
    isError: false,
    error: undefined
  }))
}))

jest.mock('../../hooks/useCustomToast', () => ({
  useCustomToast: jest.fn(() => ({
    showToast: jest.fn()
  }))
}))

jest.mock('../../hooks/useRegisterUser', () => ({
  useRegisterUser: jest.fn(() => ({
    data: undefined,
    isLoading: false,
    isError: false,
    registerUser: jest.fn(),
    error: undefined
  }))
}))

const mockCities = [
  {
    id: 1,
    name: 'Salvador'
  },
  {
    id: 2,
    name: 'Lauro de Freitas'
  }
]

const mockStates: State[] = [
  { acronym: 'BA', id: 12, name: 'Bahia' },
  { acronym: 'CE', id: 13, name: 'Ceará' }
]

function renderComponent(states: State[] = []) {
  return renderWithQueryClient(<RegisterForm states={states} />)
}

async function fillOutForm() {
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: /estado/i }),
    'Bahia'
  )

  await waitFor(() => {
    expect(screen.getByLabelText(/cidade/i)).not.toBeDisabled()
  })
  await userEvent.click(screen.getByLabelText(/cidade/i))
  userEvent.click(screen.getByText('Salvador'))
  await userEvent.type(screen.getByRole('textbox', { name: /nome/i }), 'Maria')
  await userEvent.type(
    screen.getByRole('textbox', { name: /email/i }),
    'maria@gmail.com'
  )
  await userEvent.type(screen.getByLabelText(/telefone/i), '71985642235')
  await userEvent.type(screen.getByTestId('input-password'), 'Senh@123')
  await userEvent.type(screen.getByTestId('input-confirm-password'), 'Senh@123')
}

describe('<RegisterForm />', () => {
  beforeEach(() => {
    ;(useCities as jest.Mock).mockImplementationOnce(() => ({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined
    }))
  })
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/estado/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cidade/i)).toBeDisabled()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: /nome/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /telefone/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', { name: /estado/i })
    ).toBeInTheDocument()

    const passwordInput = screen.getByTestId('input-password')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
    const confirmPasswordInput = screen.getByTestId('input-confirm-password')
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  it('should display states options on select', () => {
    renderComponent(mockStates)

    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('should enable city select and display options after state selection', async () => {
    ;(useCities as jest.Mock).mockImplementationOnce(() => ({
      isLoading: false,
      isError: false,
      data: mockCities,
      error: undefined
    }))

    renderComponent(mockStates)

    expect(screen.getByLabelText(/cidade/i)).toBeDisabled()

    userEvent.selectOptions(
      screen.getByRole('combobox', { name: /estado/i }),
      'Bahia'
    )

    await waitFor(() => {
      expect(
        screen.getByRole('combobox', { name: /estado/i })
      ).toHaveDisplayValue('Bahia')
      expect(screen.getByRole('combobox', { name: /estado/i })).toHaveValue(
        'BA'
      )

      expect(screen.getByLabelText(/cidade/i)).not.toBeDisabled()
    })

    userEvent.click(screen.getByLabelText(/cidade/i))

    await waitFor(() => {
      expect(screen.getByText('Salvador')).toBeInTheDocument()
      expect(screen.getByText('Lauro de Freitas')).toBeInTheDocument()
    })
  })

  describe('validate inputs on form submit and display errors', () => {
    beforeEach(() => {
      renderComponent(mockStates)
    })
    describe('name input', () => {
      it('when name is empty', async () => {
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Nome deve ter pelo menos 2 caracteres'))
        })
      })

      it('when name has less than two characters', async () => {
        await userEvent.type(screen.getByRole('textbox', { name: 'Nome' }), 'L')
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Nome deve ter pelo menos 2 caracteres'))
        })
      })

      it('when name has numbers', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Nome' }),
          'Luan23'
        )
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Insira apenas letras'))
        })
      })
    })

    describe('email input', () => {
      it('when email is empty', async () => {
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Email inválido'))
        })
      })

      it('when email is invalid', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Nome' }),
          'invalid@email'
        )
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Email inválido'))
        })
      })
    })

    describe('phone input', () => {
      it('when phone is empty', async () => {
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Número de telefone inválido'))
        })
      })

      it('when phone is incomplete', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Telefone' }),
          '5646'
        )
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Número de telefone inválido'))
        })
      })
    })

    describe('state select', () => {
      it('when state is not selected', async () => {
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Estado obrigatório'))
        })
      })
    })

    describe('city select', () => {
      it('when city is not selected', async () => {
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Cidade obrigatória'))
        })
      })
    })

    describe('password fields', () => {
      it('when fields are empty', async () => {
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Digite uma senha'))
          expect(screen.getByText('Repita a senha'))
        })
      })

      it('when password does not match conditions', async () => {
        await userEvent.type(screen.getByTestId('input-password'), '1234')
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Senha inválida')).toBeInTheDocument()
          expect(screen.getByTestId('password-pattern-msg')).toBeInTheDocument()
          expect(
            screen.getByText('Senha deve conter pelo menos:')
          ).toBeInTheDocument()
        })
      })

      it("when passwords don't match", async () => {
        await userEvent.type(screen.getByTestId('input-password'), '1234')
        await userEvent.type(
          screen.getByTestId('input-confirm-password'),
          '21380'
        )
        userEvent.click(screen.getByRole('button', { name: 'Criar' }))

        await waitFor(() => {
          expect(screen.getByText('Senhas não coincidem'))
        })
      })
    })
  })

  describe('form submission', () => {
    beforeEach(() => {
      ;(useCities as jest.Mock).mockImplementationOnce(() => ({
        isLoading: false,
        isError: false,
        error: undefined,
        data: mockCities
      }))
    })

    it('should display error message on form submit error', async () => {
      const showToast = jest.fn()
      const registerUser = jest.fn()
      ;(useCustomToast as jest.Mock).mockImplementation(() => ({
        showToast
      }))
      ;(useRegisterUser as jest.Mock).mockImplementation(() => ({
        data: undefined,
        isLoading: false,
        isError: true,
        registerUser,
        error: new Error('Algo deu errado')
      }))
      renderComponent(mockStates)

      await fillOutForm()

      userEvent.click(screen.getByRole('button', { name: 'Criar' }))

      await waitFor(() => {
        expect(registerUser).toHaveBeenCalled()
        expect(showToast).toHaveBeenCalled()
      })
    })

    it('should disable form when loading is true', () => {
      ;(useRegisterUser as jest.Mock).mockImplementation(() => ({
        data: undefined,
        isLoading: true,
        isError: false,
        error: undefined,
        registerUser: jest.fn()
      }))
      renderComponent(mockStates)

      expect(screen.getByLabelText(/nome/i)).toBeDisabled()
      expect(screen.getByLabelText(/email/i)).toBeDisabled()
      expect(screen.getByLabelText(/telefone/i)).toBeDisabled()
      expect(screen.getByLabelText(/estado/i)).toBeDisabled()
      expect(screen.getByLabelText(/cidade/i)).toBeDisabled()
      expect(screen.getByLabelText('Senha')).toBeDisabled()
      expect(screen.getByLabelText(/confirmar senha/i)).toBeDisabled()
    })

    it('should display success message when call to registerUser returns data', async () => {
      ;(useRegisterUser as jest.Mock).mockImplementation(() => ({
        data: { message: 'Sucesso' },
        isLoading: true,
        isError: false,
        error: undefined,
        registerUser: jest.fn()
      }))
      renderComponent(mockStates)

      expect(
        screen.getByAltText('image of a green check mark')
      ).toBeInTheDocument()
      expect(screen.getByText(/conta criada com sucesso/i)).toBeInTheDocument()
      expect(screen.queryByRole('link')).toBeInTheDocument()
      expect(screen.queryByRole('link')).toHaveAttribute('href', '/sign-in')
      expect(screen.queryByRole('form')).not.toBeInTheDocument()
    })
  })
})
