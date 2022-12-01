import { formatSearchString } from '../formatSearchString'

test('formatSearchString', () => {
  expect(formatSearchString('TEXT with ä â ë ü í ő ń ã ç')).toBe(
    'textwithaaeuionac'
  )
})
