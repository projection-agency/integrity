import React from 'react'
import './styles.css'
import './globals.css'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getLayoutData } from '@/action/getLayoutData'
import BodyBackground from '@/components/BodyBackground/BodyBackground'

import { Inter_Tight } from 'next/font/google'

const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight' })

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const { main, headerMenu } = await getLayoutData(locale)

  return (
    <html lang={locale} className={interTight.className}>
      <body>
        <BodyBackground />
        <NextIntlClientProvider>
          <Header menu={headerMenu} logo={main.logo || ''} buttonText={main.button || ''} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
