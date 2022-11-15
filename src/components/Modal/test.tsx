import { render, screen } from '@testing-library/react'
import { Modal, Props as ModalProps } from '.'

function renderComponent({
  isOpen,
  footer
}: Partial<Pick<ModalProps, 'isOpen' | 'footer'>>) {
  return render(
    <Modal
      isOpen={isOpen ?? true}
      title="Modal Title"
      content="Modal content"
      footer={footer}
    />
  )
}

describe('<Modal />', () => {
  it('should not render component', () => {
    renderComponent({ isOpen: false })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText(/modal title/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /cancelar/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /confirmar/i })
    ).not.toBeInTheDocument()
  })

  it('should render correctly', () => {
    renderComponent({})

    expect(screen.getByText(/modal title/i)).toBeInTheDocument()
    expect(screen.getByText(/modal content/i)).toBeInTheDocument()
  })

  it('should render modal with footer', () => {
    renderComponent({ footer: <p>This is the footer</p> })

    expect(screen.getByText(/this is the footer/i)).toBeInTheDocument()
  })
})
