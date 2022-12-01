export function formatSearchString(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f-\u0347]/g, '')
}
