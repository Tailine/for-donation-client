import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { Select } from '.'

const options = [
  { label: 'Item 1', value: 'item1' },
  { label: 'Item 2', value: 'item2' }
]

type Args = {
  onChange(value: string): void
}

function renderComponent({ onChange }: Partial<Args>) {
  return render(
    <Select
      options={options}
      id="category"
      name="category"
      onOptionChange={onChange ?? jest.fn()}
    />
  )
}

describe('<Select />', () => {
  it('renders correctly', () => {
    renderComponent({})

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(2)
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
