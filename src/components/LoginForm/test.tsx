import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithQueryClient } from 'utils/renderWithQueryClient'
import { LoginForm } from '.'
import { useRouter } from 'next/router'
import { useLogin } from 'hooks/useLogin'
import { useCustomToast } from 'hooks/useCustomToast'
import { CommonParams } from 'utils/testUtils'

jest.mock('../../hooks/useLogin', () => ({
  useLogin: jest.fn(() => ({
    login: jest.fn(),
    isLoading: false,
    isError: false,
    data: undefined,
    error: undefined
  }))
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  }))
}))

jest.mock('../../hooks/useCustomToast', () => ({
  useCustomToast: jest.fn(() => ({
    showToast: jest.fn()
  }))
}))

function renderComponent() {
  return renderWithQueryClient(<LoginForm />)
}

function mockUseLogin(mock?: CommonParams & { login?(): void }) {
  ;(useLogin as jest.Mock).mockImplementation(() => ({
    login: jest.fn(),
    isLoading: false,
    isError: false,
    data: undefined,
    error: undefined,
    ...mock
  }))
}

describe('<LoginForm />', () => {
  it('renders correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByTestId('input-password')).toBeInTheDocument()
    expect(screen.getByTestId('input-password')).toHaveAttribute(
      'type',
      'password'
    )
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toHaveAttribute(
      'type',
      'submit'
    )
  })

  it('should display error message when inputs are invalid and should not call login function', async () => {
    const login = jest.fn()
    mockUseLogin({ login, data: true })
    renderComponent()

    userEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText('Email inválido'))
      expect(screen.getByText('Insira a senha'))
      expect(login).not.toHaveBeenCalled()
    })
  })

  it('should call login function when inputs are valid and redirect to /donations when data is true', async () => {
    const push = jest.fn()
    const login = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({ push }))
    mockUseLogin({ login, data: true })
    renderComponent()

    await act(async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: /email/i }),
        'maria@gmail.com'
      )
      userEvent.type(screen.getByTestId('input-password'), 'Senha123')
      await waitFor(() => {
        expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
          'maria@gmail.com'
        )
        expect(screen.getByTestId('input-password')).toHaveValue('Senha123')
      })
      await userEvent.click(screen.getByRole('button', { name: /entrar/i }))
      await waitFor(() => {
        expect(push).toHaveBeenCalled()
        expect(login).toHaveBeenCalled()
        expect(push).toHaveBeenCalledWith('/donations')
      })
    })
  })

  it('should display toast when api returns an error', async () => {
    const showToast = jest.fn()
    ;(useCustomToast as jest.Mock).mockImplementation(() => ({
      showToast
    }))
    mockUseLogin({ error: new Error('Ocorreu um erro'), isError: true })
    renderComponent()

    await waitFor(() => {
      expect(showToast).toHaveBeenCalled()
    })
  })

  it('should disable inputs and button on loading', () => {
    mockUseLogin({ isLoading: true })
    renderComponent()

    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
    expect(screen.getByTestId('input-password')).toBeDisabled()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeDisabled()
  })
})
