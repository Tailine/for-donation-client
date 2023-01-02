export function apiUrl() {
  if (process.env.NODE_ENV === 'production') {
    return 'prod url'
  }
  return 'http://localhost:8080'
}
