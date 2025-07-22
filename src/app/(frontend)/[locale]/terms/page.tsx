import React from 'react'
import { getTermsData } from '@/action/getTermsData'
import ClientAccordion from '@/components/ui/Accordion/Accordion'
import s from './page.module.css'
import Image from 'next/image'
import GridBackground from '@/components/GridBackground/GridBackground'
import { formatDate } from '@/utils/date'
import { getSinglePage } from '@/action/getPage'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSinglePage('terms')

  return {
    title: page?.meta?.title || 'Terms',
    description: page?.meta?.description || '',
    openGraph: {
      title: page?.meta?.title || 'Terms',
      description: page?.meta?.description || '',
    },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { data, accordionBlock } = await getTermsData({ params })

  return (
    <div className={s.page}>
      <div className={s.heroPage}>
        <h1>{data?.title}</h1>
        <div className={s.insightCardMeta}>
          <span>Effective Date:</span>
          <div className={s.insightCardMetaItem}>
            <Image src="/images/icons/calendar.svg" alt="calendar" width={16} height={16} />
            <span>{formatDate(accordionBlock?.data)}</span>
          </div>
        </div>
        <GridBackground />
      </div>

      <div className={s.containerPage}>
        <p className={s.description}>{data?.description}</p>
        <div className={s.listAccordion}>
          <ClientAccordion items={accordionBlock?.items} />
        </div>
        <p className={s.description}>
          Copyright © [Insert Year] Integrity Marketing System. All rights reserved.
        </p>
      </div>
    </div>
  )
}
