'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import TabSection from '@/components/ui/TabSection/TabSection'
import s from './AchievementsSection.module.css'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import OrbitLogos from '@/components/OrbitLogos/OrbitLogos'
import { motion } from 'framer-motion'

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
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.4, // 40% елемента має бути видимим
        rootMargin: '0px 0px -50px 0px',
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className={s.section}>
      <div className={s.headWrapper}>
        <TabSection style="gray" text={block.subtitle || ''} />
        <MainTitle title={block.title || ''} />
      </div>
      <div className={s.achievements}>
        {block.cards?.map((card) => (
          <motion.div
            key={card.id}
            className={s.card}
            initial={{ y: 100 }}
            animate={{ y: isVisible ? 0 : 100 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 * Number(card.id) }}
          >
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
          </motion.div>
        ))}
      </div>
      <OrbitLogos />
    </div>
  )
}
