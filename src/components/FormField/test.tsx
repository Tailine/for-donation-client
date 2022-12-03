import { render, screen } from '@testing-library/react'
import { FormField, Props as FormFieldProps } from '.'

type Args = Omit<FormFieldProps, 'labelProps' | 'children'>

function renderComponent({ errorMessage, formControlProps }: Args) {
  return render(
    <FormField
      labelProps={{ htmlFor: 'category', labelText: 'Categoria' }}
      errorMessage={errorMessage}
      formControlProps={formControlProps}
    >
      <input id="category" />
    </FormField>
  )
}

describe('<FormField />', () => {
  it('should render correctly', () => {
    renderComponent({})

    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument()
    expect(screen.getByText(/categoria/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render error message for invalid input', () => {
    renderComponent({
      errorMessage: 'Something is wrong',
      formControlProps: { isInvalid: true }
    })

    expect(screen.getByText(/something is wrong/i)).toBeInTheDocument()
  })
})
