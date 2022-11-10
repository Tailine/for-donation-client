import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DonationCard, Props as DonationCardProps } from '.'

const defaultControls = {
  onEdit: () => {
    return
  },
  onDelete: () => {
    return
  },
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
        name: /my donation/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/this is the description/i)).toBeInTheDocument()
  })

  it('should render with delete and edit buttons', () => {
    renderComponent({ controls: defaultControls })

    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /deletar/i })).toBeInTheDocument()
  })

  it('should call functions on edit and delete button click', async () => {
    const editFunc = jest.fn()
    const deleteFunc = jest.fn()

    renderComponent({ controls: { onEdit: editFunc, onDelete: deleteFunc } })

    userEvent.click(screen.getByRole('button', { name: /editar/i }))
    userEvent.click(screen.getByRole('button', { name: /deletar/i }))

    await waitFor(() => {
      expect(editFunc).toHaveBeenCalled()
      expect(editFunc).toHaveBeenCalledWith('donationId')
      expect(deleteFunc).toHaveBeenCalled()
      expect(deleteFunc).toHaveBeenCalledWith('donationId')
    })
  })
})
