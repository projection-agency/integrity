import React from 'react'

import ContactForm from '@/components/sections/ContactForm/ContactForm'
import s from './page.module.css'
import GridBackground from '@/components/GridBackground/GridBackground'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import { getContactsData } from '@/action/getContactsData'

export default async function ContactsPage() {
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
