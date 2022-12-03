export function phoneMask(phone: string) {
  const onlyNumbersPhone = phone.replace(/[^0-9]/g, '')
  const phoneLength = onlyNumbersPhone.length
  if (phoneLength < 10) {
    return onlyNumbersPhone
  }

  const codeArea = onlyNumbersPhone.substring(0, 2)
  if (phoneLength === 10) {
    const firstPart = onlyNumbersPhone.substring(2, 6)
    const lastPart = onlyNumbersPhone.substring(6)

    return `${codeArea} ${firstPart}-${lastPart}`
  }

  if (phoneLength === 11) {
    const firstPart = onlyNumbersPhone.substring(2, 7)
    const lastPart = onlyNumbersPhone.substring(7)

    return `${codeArea} ${firstPart}-${lastPart}`
  }
  return phone
}
