import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImageUpload } from '.'

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(() => 'http://fake-image-url')
})

const file = [new File(['hello'], 'hello.jpg', { type: 'image/jpg' })]

function renderComponent(onImageUpload = jest.fn(), img = undefined) {
  render(<ImageUpload onImageUpload={onImageUpload} img={img} />)
}

describe('<ImageUpload />', () => {
  it('renders correctly', () => {
    renderComponent()

    const inputFile = screen.getByTestId('file-upload')
    expect(inputFile).toBeInTheDocument()
    expect(inputFile).not.toBeVisible()
    expect(inputFile).toHaveAttribute('type', 'file')
    expect(inputFile).toHaveAttribute('accept', '.jpg,.jpeg')
    expect(inputFile).not.toHaveAttribute('multiple')
    expect(screen.getByRole('button', { name: /selecione uma imagem/i }))
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('should display image passed as prop', () => {
    renderComponent(undefined, 'http://image.jpg')

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('image.jpg')
    )
  })

  it('should call onFileChange when file is selected', async () => {
    const onImageUpload = jest.fn()

    renderComponent(onImageUpload)

    userEvent.upload(screen.getByTestId('file-upload'), file)

    await waitFor(() => {
      expect(onImageUpload).toHaveBeenCalled()
      expect(onImageUpload).toHaveBeenCalledTimes(1)
      expect(onImageUpload).toHaveBeenCalledWith(file[0])
    })
  })

  it('should display selected image', async () => {
    renderComponent()

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    userEvent.upload(screen.getByTestId('file-upload'), file)

    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /selecione uma imagem/i })
      ).not.toBeInTheDocument()
    })
  })

  it('should display button when hovering over image', async () => {
    renderComponent()

    await userEvent.upload(screen.getByTestId('file-upload'), file)
    userEvent.hover(screen.getByTestId('file-upload-container'))

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /alterar imagem/i })
      ).toBeInTheDocument()
    })
  })
})
