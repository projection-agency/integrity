import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ua'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Додаємо конфігурацію для правильних URL
  pathnames: {
    '/': '/',
    '/blog': '/blog',
    '/contacts': '/contacts',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/legal-notice': '/legal-notice',
  },
})
