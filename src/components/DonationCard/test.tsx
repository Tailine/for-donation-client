import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DonationCard, Props as DonationCardProps } from '.'

const defaultControls = {
  onEdit: () => {
    return
  },
  onDelete: () => {
    return
  }
}

function renderComponent(
  props: Pick<DonationCardProps, 'controls'> = { controls: undefined }
) {
  return render(
    <DonationCard
      id="donationId"
      category="Eletrodoméstico"
      description="This is the description"
      title="My donation"
      image={{ url: '/image.png', alt: 'a beaultfil white fridge' }}
      controls={props.controls}
    />
  )
}

describe('<DonationCard />', () => {
  it('should render correctly', () => {
    renderComponent()

    expect(screen.getByAltText('a beaultfil white fridge')).toBeInTheDocument()
    expect(screen.getByText(/eletrodoméstico/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /my donation/i
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/this is the description/i)).toBeInTheDocument()
  })

  it('should render with delete and edit buttons', () => {
    renderComponent({ controls: defaultControls })

    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /deletar/i })).toBeInTheDocument()
  })

  it('should display confirm modal on delete button click', async () => {
    renderComponent({ controls: defaultControls })

    userEvent.click(screen.getByRole('button', { name: /deletar/i }))

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('should call delete function on confirm button click', async () => {
    const onDelete = jest.fn()
    renderComponent({
      controls: {
        onEdit: jest.fn(),
        onDelete
      }
    })

    userEvent.click(screen.getByRole('button', { name: /deletar/i }))
    await screen.findByRole('dialog')
    userEvent.click(screen.getByRole('button', { name: /confirmar/i }))

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalled()
    })
    renderComponent({ controls: defaultControls })
  })

  it('should close modal on cancel button click', async () => {
    renderComponent({ controls: defaultControls })

    userEvent.click(screen.getByRole('button', { name: /deletar/i }))
    await screen.findByRole('dialog')
    userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should call edit function', async () => {
    const onEdit = jest.fn()
    renderComponent({
      controls: {
        onDelete: jest.fn(),
        onEdit
      }
    })

    userEvent.click(screen.getByRole('button', { name: /editar/i }))

    await waitFor(() => {
      expect(onEdit).toHaveBeenCalled()
    })
  })
})
