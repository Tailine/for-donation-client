import { MIN_PHONE_LEN, MAX_PHONE_LEN } from 'utils/constants'
export function validateRequired(value: string, errorMessage: string) {
  if (value) {
    return { isValid: true }
  }

  return { isValid: false, message: errorMessage }
}

export function validateName(text: string) {
  if (text.length < 2) {
    return { isValid: false, message: 'Nome deve ter pelo menos 2 caracteres' }
  }

  return { isValid: true }
}

export function validateHasOnlyLetters(value: string) {
  if (/\d/.test(value)) {
    return { isValid: false, message: 'Insira apenas letras' }
  }

  return { isValid: true }
}

export function validatePhone(phone: string) {
  if (![MIN_PHONE_LEN, MAX_PHONE_LEN].includes(phone.length)) {
    return {
      isValid: false,
      message: 'Número de telefone inválido'
    }
  }

  return { isValid: true }
}

export function isFormValid(errorObject: Record<string, any>) {
  return !Object.keys(errorObject).length
}
