import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { Select } from '.'

const options = [
  { name: 'Item 1', value: 'item1' },
  { name: 'Item 2', value: 'item2' }
]

type Args = {
  errorMessage: string
  isInvalid: boolean
  onChange(value: string): void
}

function renderComponent({ errorMessage, isInvalid, onChange }: Partial<Args>) {
  return render(
    <Select
      options={options}
      selectProps={{
        id: 'category',
        name: 'category',
        onOptionChange: onChange ?? jest.fn()
      }}
      labelProps={{ htmlFor: 'category', labelText: 'Categoria' }}
      errorMessage={errorMessage}
      formControlProps={{ isInvalid }}
    />
  )
}

describe('<Select />', () => {
  it('renders correctly', () => {
    renderComponent({})

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(2)
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument()
    expect(screen.getByText(/categoria/i)).toBeInTheDocument()
  })

  it('should render error message', () => {
    renderComponent({
      errorMessage: 'Error!',
      isInvalid: true
    })

    expect(screen.getByText('Error!')).toBeInTheDocument()
  })

  it('should call onChange function on option change', async () => {
    const changeFn = jest.fn()
    renderComponent({ onChange: changeFn })

    userEvent.selectOptions(screen.getByRole('combobox'), ['item2'])

    await waitFor(() => {
      expect(changeFn).toHaveBeenCalled()
      expect(changeFn).toHaveBeenCalledWith('item2')
      expect(screen.getByRole('combobox')).toHaveValue('item2')
    })
  })
})
