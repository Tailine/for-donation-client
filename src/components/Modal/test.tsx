import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, Props as ModalProps } from '.'

function renderComponent({
  onCancel,
  onConfirm,
  isOpen,
}: Partial<Pick<ModalProps, 'onCancel' | 'onConfirm' | 'isOpen'>>) {
  return render(
    <Modal
      isOpen={isOpen ?? true}
      title="Modal Title"
      content="Modal content"
      onConfirm={onConfirm ?? jest.fn()}
      onCancel={onCancel ?? jest.fn()}
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
    expect(
      screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /confirmar/i })
    ).toBeInTheDocument()
  })

  it('should call cancel function', async () => {
    const onCancel = jest.fn()
    renderComponent({ onCancel })

    userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalled()
    })
  })

  it('should call confirm function', async () => {
    const onConfirm = jest.fn()
    renderComponent({ onConfirm })

    userEvent.click(screen.getByRole('button', { name: /confirmar/i }))

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled()
    })
  })
})
