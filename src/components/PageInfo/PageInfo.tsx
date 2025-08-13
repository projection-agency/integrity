import GridBackground from '../GridBackground/GridBackground'
import ClientAccordion from '../ui/Accordion/Accordion'
import s from './PageInfo.module.css'
import Image from 'next/image'
import { formatDate } from '@/utils/date'
import { useTranslations } from 'next-intl'

export default function PageInfo({ data, accordionBlock }: { data: any; accordionBlock: any }) {
  const t = useTranslations('InfoPage')

  return (
    <div className={s.page}>
      <div className={s.heroPage}>
        <h1>{data?.title}</h1>
        <div className={s.insightCardMeta}>
          <span>{t('effectiveDate')}:</span>
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
        <p className={s.description}>{t('copyright')}</p>
      </div>
    </div>
  )
}
