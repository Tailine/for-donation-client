import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { InputPhone } from '.'

jest.mock('utils/phoneMask', () => {
  return {
    phoneMask: () => ({
      originalValue: '71999999999',
      formattedValue: '71 99999-9999'
    })
  }
})

type Args = Partial<{
  onChange: () => void
}>

function renderComponent({ onChange }: Args) {
  return render(
    <InputPhone name="Name" id="id" onValueChange={onChange ?? jest.fn()} />
  )
}

describe('<InputPhone />', () => {
  it('renders correctly', () => {
    const { container } = renderComponent({})

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(container.querySelector('input').type).toBe('tel')
  })

  it('should call onValueChange function on input change', async () => {
    const changeFn = jest.fn()
    renderComponent({ onChange: changeFn })

    userEvent.type(screen.getByRole('textbox'), '32874')

    await waitFor(() => {
      expect(changeFn).toHaveBeenCalled()
    })
  })

  it('should format value on input change', async () => {
    renderComponent({})

    userEvent.type(screen.getByRole('textbox'), '71999999999')

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('71 99999-9999')
    })
  })
})
