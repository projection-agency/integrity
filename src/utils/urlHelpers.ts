/**
 * Статичний базовий URL сайту
 */
const BASE_URL = 'https://www.integritymarketing.systems'

/**
 * Перевіряє, чи поточний URL є localhost
 */
export function isLocalhost(): boolean {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  }
  return false
}

/**
 * Отримує поточну локаль з URL
 */
export function getCurrentLocale(): string {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    const locale = pathname.split('/')[1]
    return ['en', 'ua'].includes(locale) ? locale : 'en'
  }
  return 'en'
}

/**
 * Створює URL для локалізованих сторінок
 */
export function createLocalizedUrl(path: string, locale?: string): string {
  const currentLocale = locale || getCurrentLocale()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${currentLocale}${cleanPath}`
}

/**
 * Перевіряє, чи URL є абсолютним
 */
export function isAbsoluteUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

/**
 * Нормалізує URL (додає базовий URL якщо потрібно)
 */
export function normalizeUrl(url: string): string {
  if (isAbsoluteUrl(url)) {
    return url
  }

  const cleanUrl = url.startsWith('/') ? url : `/${url}`
  return `${BASE_URL}${cleanUrl}`
}

/**
 * Отримує статичний базовий URL
 */
export function getBaseUrl(): string {
  return BASE_URL
}
