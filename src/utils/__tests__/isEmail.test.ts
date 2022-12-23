import { isEmail } from 'utils/isEmail'

describe('isEmail', () => {
  it('should return false for invalid email', () => {
    expect(isEmail('email32@.com')).toBe(false)
    expect(isEmail('invalid@email.')).toBe(false)
    expect(isEmail('invalid@email')).toBe(false)
    expect(isEmail('email')).toBe(false)
    expect(isEmail('')).toBe(false)
    expect(isEmail('email@')).toBe(false)
    expect(isEmail('email@.c')).toBe(false)
  })

  it('should return true for valid email', () => {
    expect(isEmail('email32@g.com')).toBe(true)
    expect(isEmail('23@gmail.com')).toBe(true)
    expect(isEmail('email32@32.com')).toBe(true)
    expect(isEmail('email32@gmail.co')).toBe(true)
    expect(isEmail('email@gm.co')).toBe(true)
  })
})
