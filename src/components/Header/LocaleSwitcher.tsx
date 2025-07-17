'use client'

import React from 'react'
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

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  function handleSwitch(locale: string) {
    if (locale === currentLocale) return
    router.replace(pathname, { locale })
  }

  return (
    <div className={s.localeWrap}>
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
