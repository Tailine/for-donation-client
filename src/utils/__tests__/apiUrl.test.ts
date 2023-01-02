import { apiUrl } from '../apiUrl'

describe('apiUrl', () => {
  it('should return production url', () => {
    process.env = {
      NODE_ENV: 'production'
    }
    expect(apiUrl()).toBe('prod url')
  })

  it('should development url', () => {
    process.env = {
      NODE_ENV: 'development'
    }
    expect(apiUrl()).toBe('http://localhost:8080')
  })

  it('should development url', () => {
    process.env = {
      NODE_ENV: 'test'
    }
    expect(apiUrl()).toBe('http://localhost:8080')
  })
})
