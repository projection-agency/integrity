// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

// Адаптивна конфігурація для локальної розробки та продакшину
const IS_PROD = process.env.NODE_ENV === 'production'
const CANON_URL = process.env.SITE_URL || 'https://www.integritymarketingsystem.com'
const CANON = new URL(CANON_URL)
const CANON_HOST = CANON.host

// Функція для нормалізації URL тільки на продакшині
function normalizeUrlForProduction(urlLike: string, baseUrl: string): string {
  const u = new URL(urlLike, baseUrl)
  u.protocol = 'https:'
  u.hostname = CANON_HOST
  u.port = ''
  return u.toString()
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Логування для діагностики
  console.log('Middleware called:', {
    pathname,
    isProd: IS_PROD,
    host: request.headers.get('host'),
    xForwardedHost: request.headers.get('x-forwarded-host'),
    xForwardedProto: request.headers.get('x-forwarded-proto'),
  })

  // Не застосовувати локалізацію до /admin і /api та їх підшляхів
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    console.log('Skipping admin/api path:', pathname)
    return
  }

  // ЛОКАЛЬНА РОЗРОБКА: простий middleware без додаткової обробки
  if (!IS_PROD) {
    console.log('Local development mode, using simple intl middleware')
    return intlMiddleware(request)
  }

  console.log('Production mode, using full middleware')

  // ПРОДАКШН: повна обробка з нормалізацією URL
  const incomingHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || ''
  const incomingProto = (request.headers.get('x-forwarded-proto') || 'http').toLowerCase()

  // 1) Перевіряємо host/proto
  console.log('Checking host/proto:', {
    incomingHost,
    incomingProto,
    expectedHost: CANON_HOST,
    expectedProto: 'https',
    shouldRedirect: incomingHost !== CANON_HOST || incomingProto !== 'https',
  })

  if (incomingHost !== CANON_HOST || incomingProto !== 'https') {
    const url = new URL(pathname + request.nextUrl.search, CANON_URL)
    url.protocol = 'https:'
    url.hostname = CANON_HOST
    url.port = ''
    console.log('Redirecting to:', url.toString())
    return NextResponse.redirect(url, 301)
  }

  // 2) Даємо відпрацювати next-intl
  console.log('Calling intlMiddleware for pathname:', pathname)
  const res = intlMiddleware(request)
  console.log('intlMiddleware result:', {
    hasResponse: !!res,
    hasLocation: res?.headers.has('location'),
    hasRewrite: res?.headers.has('x-middleware-rewrite'),
    location: res?.headers.get('location'),
    rewrite: res?.headers.get('x-middleware-rewrite'),
  })

  if (!res) {
    console.log('No response from intlMiddleware, calling NextResponse.next()')
    return NextResponse.next()
  }

  // 3) Нормалізуємо headers
  const currentAbs = normalizeUrlForProduction(pathname + request.nextUrl.search, CANON_URL)
  const hasLoc = res.headers.has('location')
  const hasRw = res.headers.has('x-middleware-rewrite')

  console.log('Normalizing headers:', {
    currentAbs,
    hasLocation: hasLoc,
    hasRewrite: hasRw,
    originalLocation: res.headers.get('location'),
    originalRewrite: res.headers.get('x-middleware-rewrite'),
  })

  // НОРМАЛІЗАЦІЯ: спочатку Location, потім (тільки якщо нема редіректу) rewrite
  if (hasLoc) {
    const fixed = normalizeUrlForProduction(res.headers.get('location')!, CANON_URL)
    if (fixed === currentAbs) {
      res.headers.delete('location')
      console.log('Removed location header (same as current)')
    } else {
      res.headers.set('location', fixed)
      console.log('Fixed location header:', fixed)
    }
    res.headers.delete('x-middleware-rewrite') // не міксуємо
  } else if (hasRw) {
    const originalRewrite = res.headers.get('x-middleware-rewrite')!
    const fixedRw = normalizeUrlForProduction(originalRewrite, CANON_URL)

    console.log('Processing rewrite header:', {
      original: originalRewrite,
      fixed: fixedRw,
      currentAbs,
    })

    if (fixedRw === currentAbs) {
      res.headers.delete('x-middleware-rewrite')
      console.log('Removed rewrite header (same as current)')
    } else {
      res.headers.set('x-middleware-rewrite', fixedRw)
      console.log('Fixed rewrite header:', fixedRw)
    }
  }

  // 4) Якщо після нормалізації немає ні redirect, ні rewrite — просто пропускаємо далі
  const finalHasLocation = res.headers.has('location')
  const finalHasRewrite = res.headers.has('x-middleware-rewrite')

  console.log('Final header state:', {
    hasLocation: finalHasLocation,
    hasRewrite: finalHasRewrite,
    finalLocation: res.headers.get('location'),
    finalRewrite: res.headers.get('x-middleware-rewrite'),
  })

  if (!finalHasLocation && !finalHasRewrite) {
    console.log('No redirect/rewrite headers, passing through')
    const pass = NextResponse.next()
    const setCookie = res.headers.get('set-cookie')
    if (setCookie) pass.headers.append('set-cookie', setCookie)
    return pass
  }

  console.log('Returning final response from middleware')
  return res
}

export const config = {
  matcher: ['/((?!admin|api|images|media|_next|static|favicon.ico).*)'],
}
