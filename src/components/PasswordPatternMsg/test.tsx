import { render, screen } from '@testing-library/react'
import { PasswordPatternMsg } from '.'

describe('<PasswordPatternMsg />', () => {
  it('renders correctly', () => {
    render(<PasswordPatternMsg />)

    expect(
      screen.getByText('Senha deve conter pelo menos:')
    ).toBeInTheDocument()
    expect(screen.getByText('8 caracteres')).toBeInTheDocument()
    expect(screen.getByText('1 letra maiúscula')).toBeInTheDocument()
    expect(screen.getByText('1 caractere especial')).toBeInTheDocument()
    expect(screen.getByText('1 número')).toBeInTheDocument()
  })
})
