import React from 'react'
import './styles.css'

import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

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

  const payload = await getPayload({ config: await config })
  const main = await payload.findGlobal({ slug: 'main' })
  const menuGlobal = await payload.findGlobal({ slug: 'menu' })
  const headerMenu = Array.isArray(menuGlobal?.['header-menu'])
    ? menuGlobal['header-menu'].map(({ id, ...rest }) => ({
        ...rest,
        id: typeof id === 'string' ? id : undefined,
      }))
    : []

  return (
    <html lang={locale} className={interTight.className}>
      <body>
        <NextIntlClientProvider>
          <Header menu={headerMenu} logo={main.logo || ''} buttonText={main.button || ''} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
