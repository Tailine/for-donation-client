export function isOfType<Type>(
  data: any,
  propertyList: string[]
): data is Type {
  if (data instanceof Array) {
    if (!data.length) {
      return false
    }
    return propertyList.every((property) => property in data[0])
  }
  return propertyList.every((property) => property in data)
}
