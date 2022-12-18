import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { Input } from '.'
import { PhoneMaskResult } from 'utils/phoneMask'

type Args = Partial<{
  onValueChange(): void
  initialValue: string
  formatInput(): PhoneMaskResult
}>

function renderComponent({ initialValue, onValueChange, formatInput }: Args) {
  return render(
    <Input
      id="name"
      name="name"
      onValueChange={onValueChange ?? jest.fn()}
      initialValue={initialValue}
      formatInput={formatInput}
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

  it('should call format function when it is passed as prop', () => {
    const formatFn = jest.fn()
    renderComponent({ formatInput: formatFn })

    userEvent.type(screen.getByRole('textbox'), 'Maria3242987#$#@')

    expect(formatFn).toHaveBeenCalled()
  })
})
