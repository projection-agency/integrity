import React from 'react'

import ContactForm from '@/components/sections/ContactForm/ContactForm'
import s from './page.module.css'
import GridBackground from '@/components/GridBackground/GridBackground'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import { getContactsData } from '@/action/getContactsData'
import { getSinglePage } from '@/action/getPage'
import { Metadata } from 'next'
import { getMainInfo } from '@/action/getMainInfo'


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const page = await getSinglePage('contacts', locale)
  return {
    title: page?.meta?.title || 'Contacts',
    description: page?.meta?.description || '',
    openGraph: {
      title: page?.meta?.title || 'Contacts',
      description: page?.meta?.description || '',
    },
  }
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const page = await getSinglePage('contacts', locale)

  const { heroBlock } = await getContactsData(locale)
  const mainRedirect = await getMainInfo(locale)
  const rd = {
    url: mainRedirect?.redirect || '',
  }
  return (
    <div className={s.page}>
      <div className={s.heroPage}>
        <div className={s.subtitle}>
          <span>{heroBlock?.subtitle || ''}</span>
        </div>
        <MainTitle title={heroBlock?.title || ''} />
        <GridBackground />
      </div>
      <div className={s.fillFormWrapper}>
        <ContactForm url={rd} />
      </div>
    </div>
  )
}
