import React from 'react'
import ClientAccordion from '@/components/ui/Accordion/Accordion'
import s from './page.module.css'
import Image from 'next/image'
import GridBackground from '@/components/GridBackground/GridBackground'
import { getLegalNoticeData } from '@/action/getLegalNoticeData'
import { formatDate } from '@/utils/date'

export default async function LegalNoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { data, accordionBlock } = await getLegalNoticeData({ params })

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
