export function sortBy<ObjectType>(
  a: ObjectType,
  b: ObjectType,
  key: keyof ObjectType
) {
  if (a[key] > b[key]) {
    return 1
  }
  if (a[key] < b[key]) {
    return -1
  }
  return 0
}
