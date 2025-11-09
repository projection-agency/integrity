/**
 * Повертає статичний базовий URL сайту
 */
export function getBaseUrl(): string {
  return 'https://www.integritymarketing.systems'
}

/**
 * Отримує повний URL для заданого шляху
 */
export function getFullUrl(path: string): string {
  const baseUrl = getBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * Отримує URL для API endpoints
 */
export function getApiUrl(path: string): string {
  const baseUrl = getBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}/api${cleanPath}`
}
