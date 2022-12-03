import { phoneMask } from 'utils/phoneMask'

describe('phoneMask', () => {
  it('should not format phone when length is less than 10', () => {
    expect(phoneMask('719999888')).toBe('719999888')
  })

  it('should format phone when length is 10', () => {
    expect(phoneMask('7199998888')).toBe('71 9999-8888')
  })

  it('should format phone when length is 11', () => {
    expect(phoneMask('71999998888')).toBe('71 99999-8888')
  })

  it('should remove not number characters', () => {
    expect(phoneMask('719greggr@#$#@&-=99998888')).toBe('71 99999-8888')
  })
})
