'use client'

import React, { useEffect } from 'react'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import s from './Header.module.css'
import Image from 'next/image'

const locales = [
  {
    code: 'en',
    label: 'EN',
    flag: '/images/lang/en.svg',
  },
  {
    code: 'ua',
    label: 'UA',
    flag: '/images/lang/ua.svg',
  },
]

export default function LocaleSwitcher({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const useLocaleHook = useLocale()

  // Функція для читання кукі
  function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null

    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
  }

  // Визначаємо поточну мову з кукі, або з pathname як fallback
  const cookieLocale = getCookie('NEXT_LOCALE')
  const [currentLocale, setCurrentLocale] = React.useState(
    () => cookieLocale || (pathname.startsWith('/ua') ? 'ua' : 'en'),
  )

  // // Додаємо логування для діагностики
  // console.log('LocaleSwitcher render:', {
  //   useLocaleHook,
  //   cookieLocale,
  //   currentLocale,
  //   pathname,
  //   cookie: document.cookie,
  // })

  // Оновлюємо currentLocale при зміні кукі або pathname
  useEffect(() => {
    const newCookieLocale = getCookie('NEXT_LOCALE')
    const newLocale = newCookieLocale || (pathname.startsWith('/ua') ? 'ua' : 'en')

    if (newLocale !== currentLocale) {
      console.log('Updating currentLocale from', currentLocale, 'to', newLocale)
      setCurrentLocale(newLocale)
    }
  }, [pathname, currentLocale])

  // // Відстежуємо зміни pathname та currentLocale
  // useEffect(() => {
  //   console.log('LocaleSwitcher effect - pathname or locale changed:', {
  //     pathname,
  //     useLocaleHook,
  //     cookieLocale,
  //     currentLocale,
  //     cookie: document.cookie,
  //   })
  // }, [pathname, useLocaleHook, cookieLocale, currentLocale])

  function handleSwitch(locale: string) {
    console.log('Switching to locale:', locale, 'from:', currentLocale)

    if (locale === currentLocale) {
      console.log('Same locale, skipping')
      return
    }

    // Зберігаємо вибрану мову в кукі
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`
    console.log('Cookie set:', document.cookie)

    try {
      // Прибираємо поточний префікс локалі з pathname
      const cleanedPath = pathname.replace(/^\/(en|ua)(?=\/|$)/, '') || '/'
      router.replace(cleanedPath as unknown as any, { locale })
      console.log('Router replace called')
    } catch (error) {
      console.error('Error switching locale:', error)
    }
  }

  return (
    <div className={`${s.localeWrap} ${className}`}>
      {locales.map(({ code, label, flag }) => (
        <div
          key={code}
          className={code === currentLocale ? s.currentLang : s.lang}
          onClick={() => handleSwitch(code)}
        >
          {code === currentLocale && (
            <Image
              src={flag}
              alt={label}
              className={s.flag}
              style={{ fontSize: '1.5em', marginRight: 4 }}
              width={24}
              height={24}
            />
          )}
          <span className={s.localeName}>{label}</span>
        </div>
      ))}
    </div>
  )
}
