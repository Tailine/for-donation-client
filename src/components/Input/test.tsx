import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { Input } from '.'

type Args = Partial<{
  onValueChange(): void
  isInvalid: boolean
  errorMessage: string
  initialValue: string
}>

function renderComponent({ initialValue, onValueChange }: Args) {
  return render(
    <Input
      id="name"
      name="name"
      onValueChange={onValueChange ?? jest.fn()}
      initialValue={initialValue}
    />
  )
}

describe('<Input />', () => {
  it('renders correctly', () => {
    renderComponent({})

    expect(screen.getByRole('textbox')).toBeInTheDocument()
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
