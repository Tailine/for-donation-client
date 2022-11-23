import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { InputLabel } from '.'

type Args = Partial<{
  onValueChange(): void
  isInvalid: boolean
  errorMessage: string
  initialValue: string
}>

function renderComponent({
  initialValue,
  onValueChange,
  isInvalid = false,
  errorMessage
}: Args) {
  return render(
    <InputLabel
      labelProps={{ htmlFor: 'name', labelText: 'Name:' }}
      inputProps={{
        id: 'name',
        name: 'name',
        onValueChange: onValueChange ?? jest.fn(),
        initialValue
      }}
      formControlProps={{ isInvalid }}
      errorMessage={errorMessage}
    />
  )
}

describe('<InputLabel />', () => {
  it('renders correctly', () => {
    renderComponent({})

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByText(/name/i)).toBeInTheDocument()
  })

  it('should render error message for invalid input', () => {
    renderComponent({ errorMessage: 'Something is wrong' })

    expect(screen.getByText(/something is wrong/i)).toBeInTheDocument()
  })

  it('should call onValueChange func on input change', async () => {
    const changeFn = jest.fn()
    renderComponent({ onValueChange: changeFn })

    userEvent.type(screen.getByRole('textbox'), 'Maria')

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('Maria')
      expect(changeFn).toHaveBeenCalledWith('Maria')
      expect(changeFn).toHaveBeenCalled()
    })
  })

  it('should render input with initialValue', () => {
    renderComponent({ initialValue: 'Pedro' })

    expect(screen.getByRole('textbox')).toHaveValue('Pedro')
  })
})
