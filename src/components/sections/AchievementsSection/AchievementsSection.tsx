'use client'
import Image from 'next/image'
import TabSection from '@/components/ui/TabSection/TabSection'
import s from './AchievementsSection.module.css'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import OrbitLogos from '@/components/OrbitLogos/OrbitLogos'

type AchievementsBlock = {
  subtitle?: string
  title?: string
  cards?: {
    id: string
    icon: {
      url: string
    }
    title: string
    description: string
    label: string
  }[]
}

export default function AchievementsSection({
  block,
  locale,
}: {
  block: AchievementsBlock
  locale: string
}) {
  return (
    <div className={s.section}>
      <div className={s.headWrapper}>
        <TabSection style="gray" text={block.subtitle || ''} />
        <MainTitle title={block.title || ''} />
      </div>
      <div className={s.achievements}>
        {block.cards?.map((card) => (
          <div key={card.id} className={s.card}>
            <div className={s.cardIcon}>
              <Image src={card.icon.url} alt={card.title} width={100} height={100} />
              <div className={s.cardIconText}>
                <span>{card.label}</span>
              </div>
            </div>
            <div className={s.cardContent}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <OrbitLogos />
    </div>
  )
}
