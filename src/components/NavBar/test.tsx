import { render, screen } from '@testing-library/react'
import { NavBar } from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: ''
  }))
}))

describe('<NavBar />', () => {
  describe('not authenticated user', () => {
    test('renders correctly', () => {
      render(<NavBar isAuthenticated={false} />)

      expect(screen.getByRole('img', { name: 'logo' })).toBeInTheDocument()
      expect(
        screen.getByRole('img', { name: 'logo' }).parentElement
      ).toHaveAttribute('href', '/doacoes')
      expect(
        screen.queryByRole('link', { name: /doações/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('link', { name: /minhas doações/i })
      ).not.toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('authenticated user', () => {
    test('renders correctly', () => {
      render(<NavBar isAuthenticated />)

      expect(screen.getByRole('img', { name: 'logo' })).toBeInTheDocument()
      expect(
        screen.getByRole('img', { name: 'logo' }).parentElement
      ).toHaveAttribute('href', '/doacoes')
      expect(screen.getAllByRole('link', { name: /doações/i })).toHaveLength(2)
      expect(
        screen.getByRole('link', { name: /minhas doações/i })
      ).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})
