import { render, screen } from '@testing-library/react'
import { InputLabel } from '.'

describe('<InputLabel />', () => {
  test('renders correctly', () => {
    render(
      <InputLabel
        labelProps={{ htmlFor: 'name', labelText: 'Name:' }}
        inputProps={{ id: 'name', name: 'name' }}
      />
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/name/i)).toBeInTheDocument()
  })

  test('should render error message for invalid input', () => {
    render(
      <InputLabel
        labelProps={{ htmlFor: 'name', labelText: 'Name:' }}
        inputProps={{ id: 'name', name: 'name' }}
        formControlProps={{ isInvalid: true }}
        errorMessage="Something is wrong"
      />
    )

    expect(screen.getByText(/something is wrong/i)).toBeInTheDocument()
  })
})
