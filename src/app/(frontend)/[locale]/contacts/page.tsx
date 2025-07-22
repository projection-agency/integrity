import React from 'react'

import ContactForm from '@/components/sections/ContactForm/ContactForm'
import s from './page.module.css'
import GridBackground from '@/components/GridBackground/GridBackground'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import { getContactsData } from '@/action/getContactsData'
import { getSinglePage } from '@/action/getPage'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSinglePage('contacts')

  return {
    title: page?.meta?.title || 'Contacts',
    description: page?.meta?.description || '',
    openGraph: {
      title: page?.meta?.title || 'Contacts',
      description: page?.meta?.description || '',
    },
  }
}

export default async function ContactsPage() {
  const page = await getSinglePage('contacts')

  const { heroBlock } = await getContactsData()

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
        <ContactForm />
      </div>
    </div>
  )
}
