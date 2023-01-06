export function validateRequired(value: string, errorMessage: string) {
  if (value) {
    return { isValid: true }
  }

  return { isValid: false, message: errorMessage }
}
