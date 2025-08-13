import React from 'react'
import './styles.css'
import './globals.css'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getLayoutData } from '@/action/getLayoutData'
import { getMessages } from 'next-intl/server'
import BodyBackground from '@/components/BodyBackground/BodyBackground'
import { Metadata } from 'next'

import { Inter_Tight } from 'next/font/google'
import { Inter } from 'next/font/google'
import HeaderFix from '@/components/HeaderFix/HeaderFix'
import { CustomToastProvider } from '@/contexts/CustomToastProvider'
import { LordIconProvider } from '@/contexts/LordIconProvider'
import Script from 'next/script'
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const metadata = {
    uk: {
      title: 'Integrity - Розумний Цифровий Маркетинг для Зростання Бізнесу',
      description:
        'Integrity Marketing System - розумний цифровий маркетинг, що забезпечує зростання вашого бізнесу. Експертні стратегії, аналітика даних та результативні кампанії для B2B, SaaS, e-commerce та інших галузей.',
      keywords:
        'цифровий маркетинг, B2B маркетинг, SaaS маркетинг, e-commerce маркетинг, маркетингові стратегії, аналітика даних, рекламні кампанії, зростання бізнесу, digital marketing Ukraine',
      openGraph: {
        title: 'Integrity - Розумний Цифровий Маркетинг для Зростання Бізнесу',
        description:
          'Розумний цифровий маркетинг, що забезпечує зростання вашого бізнесу. Експертні стратегії та результативні кампанії.',
        locale: 'uk_UA',
        alternateLocale: 'en_US',
      },
      twitter: {
        title: 'Integrity - Розумний Цифровий Маркетинг для Зростання Бізнесу',
        description: 'Розумний цифровий маркетинг, що забезпечує зростання вашого бізнесу',
      },
    },
    en: {
      title: 'Integrity - Smart Digital Marketing That Drives Growth',
      description:
        'Integrity Marketing System - smart digital marketing that drives business growth. Expert strategies, data analytics and effective campaigns for B2B, SaaS, e-commerce and other industries.',
      keywords:
        'digital marketing, B2B marketing, SaaS marketing, e-commerce marketing, marketing strategies, data analytics, advertising campaigns, business growth, digital marketing agency',
      openGraph: {
        title: 'Integrity - Smart Digital Marketing That Drives Growth',
        description:
          'Smart digital marketing that drives business growth. Expert strategies and effective campaigns.',
        locale: 'en_US',
        alternateLocale: 'uk_UA',
      },
      twitter: {
        title: 'Integrity - Smart Digital Marketing That Drives Growth',
        description: 'Smart digital marketing that drives business growth',
      },
    },
  }

  const currentMetadata = metadata[locale as keyof typeof metadata] || metadata.en

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    keywords: currentMetadata.keywords,
    authors: [{ name: 'Integrity Marketing System' }],
    creator: 'Integrity Marketing System',
    publisher: 'Integrity Marketing System',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        uk: '/uk',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Integrity Marketing System',
      title: currentMetadata.openGraph.title,
      description: currentMetadata.openGraph.description,
      locale: currentMetadata.openGraph.locale,
      alternateLocale: currentMetadata.openGraph.alternateLocale,
      url: '/',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMetadata.twitter.title,
      description: currentMetadata.twitter.description,
      images: ['/images/bg_services.png'],
      creator: '@integrity_marketing',
      site: '@integrity_marketing',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    themeColor: '#222222',
    other: {
      'msapplication-TileColor': '#222222',
      'msapplication-config': '/browserconfig.xml',
    },
    verification: {
      google: 'your-google-verification-code',
    },
  }
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

  const [messages, { main, headerMenu, footerMenu }] = await Promise.all([
    getMessages({ locale }),
    getLayoutData(locale),
  ])

  return (
    <html lang={locale} className={`${interTight.className} ${inter.className}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CustomToastProvider>
            <LordIconProvider />
            <BodyBackground />
            <Header menu={headerMenu} logo={main.logo || ''} buttonText={main.button || ''} />
            <HeaderFix menu={headerMenu} buttonText={main.button || ''} />
            <main>{children}</main>
            <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
            <Footer menu={footerMenu} />
          </CustomToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
