import { MAX_PHONE_LEN, MIN_PHONE_LEN } from './constants'

export type PhoneMaskResult = {
  originalValue: string
  formattedValue: string
}

export function phoneMask(phone: string): PhoneMaskResult {
  const onlyNumbersPhone = phone.replace(/[^0-9]/g, '')
  const phoneLength = onlyNumbersPhone.length

  const codeArea = onlyNumbersPhone.substring(0, 2)
  if (phoneLength === MIN_PHONE_LEN) {
    const firstPart = onlyNumbersPhone.substring(2, 6)
    const lastPart = onlyNumbersPhone.substring(6)

    return {
      originalValue: onlyNumbersPhone,
      formattedValue: `${codeArea} ${firstPart}-${lastPart}`
    }
  }

  if (phoneLength >= MAX_PHONE_LEN) {
    const onlyElevenChars = onlyNumbersPhone.substring(0, 11)
    const firstPart = onlyElevenChars.substring(2, 7)
    const lastPart = onlyElevenChars.substring(7, 11)

    return {
      originalValue: onlyElevenChars,
      formattedValue: `${codeArea} ${firstPart}-${lastPart}`
    }
  }

  return { originalValue: onlyNumbersPhone, formattedValue: onlyNumbersPhone }
}
