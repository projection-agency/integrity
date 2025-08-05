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
import { PageTransitionProvider } from '@/contexts/PageTransitionContext'
import PageTransition from '@/components/PageTransition/PageTransition'
import PageTransitionOverlay from '@/components/PageTransition/PageTransitionOverlay'
import TransitionBackground from '@/components/TransitionBackground/TransitionBackgroundWrapper'
import TransitionBodyBackground from '@/components/TransitionBodyBackground/TransitionBodyBackground'
import PageLoadHandler from '@/components/PageLoadHandler/PageLoadHandler'

import { Inter_Tight } from 'next/font/google'
import { Inter } from 'next/font/google'
import HeaderFix from '@/components/HeaderFix/HeaderFix'

const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight' })
const inter = Inter({ subsets: ['latin'] ,variable:"--font-inter"})

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

  const { main, headerMenu, footerMenu } = await getLayoutData(locale)

  return (
    <html lang={locale} className={`${interTight.className} ${inter.className}`}>
      <body>
        <BodyBackground />
        <NextIntlClientProvider>
          <PageTransitionProvider>
            <PageLoadHandler />
            <PageTransitionOverlay />
            <TransitionBodyBackground />
            <TransitionBackground />
            <Header menu={headerMenu} logo={main.logo || ''} buttonText={main.button || ''} />
            <HeaderFix menu={headerMenu} buttonText={main.button || ''} />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer menu={footerMenu} />
          </PageTransitionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
