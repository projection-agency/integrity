'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Конфігурація фонів для різних сторінок
const BACKGROUND_CONFIG = {
  home: {
    class: 'homeBackground',
    paths: ['/', '/en', '/ua'],
  },
  contacts: {
    class: 'contactsBackground',
    paths: ['/contacts', '/en/contacts', '/ua/contacts'],
  },
  blog: {
    class: 'blogBackground',
    paths: ['/blog', '/en/blog', '/ua/blog'],
  },
  blogPost: {
    class: 'blogPostBackground',
    paths: ['/blog/'],
  },
  privacy: {
    class: 'privacyBackground',
    paths: ['/privacy', '/en/privacy', '/ua/privacy'],
  },
}

export default function BodyBackground() {
  const pathname = usePathname()

  useEffect(() => {
    // Видаляємо всі попередні класи фону
    Object.values(BACKGROUND_CONFIG).forEach((config) => {
      document.body.classList.remove(config.class)
    })

    // Визначаємо який фон потрібно застосувати
    let backgroundClass = null

    // Перевіряємо точні співпадіння
    for (const [key, config] of Object.entries(BACKGROUND_CONFIG)) {
      if (config.paths.some((path) => pathname === path)) {
        backgroundClass = config.class
        break
      }
    }

    // Якщо точного співпадіння немає, перевіряємо часткові співпадіння
    if (!backgroundClass) {
      if (pathname.includes('/blog/') && pathname !== '/blog' && !pathname.endsWith('/blog')) {
        backgroundClass = BACKGROUND_CONFIG.blogPost.class
      } else if (pathname.includes('/contacts')) {
        backgroundClass = BACKGROUND_CONFIG.contacts.class
      } else if (pathname.includes('/blog')) {
        backgroundClass = BACKGROUND_CONFIG.blog.class
      }
    }

    // Додаємо клас фону
    if (backgroundClass) {
      document.body.classList.add(backgroundClass)
    }
  }, [pathname])

  return null
}
