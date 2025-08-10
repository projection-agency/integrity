'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './SectionUnique.module.css'
import { PhoneIcon } from './icons/PhoneIcon'
import {
  CanvasIcon,
  GlobeIcon,
  ChartIcon,
  ChartBarIcon,
  DocumentIcon,
  AnalyticsIcon,
} from '../../Icon/Icon'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import useIsMobile from '../LatestInsightsSection/useIsMobile'
import SliderNav from '@/components/ui/SliderNav/SliderNav'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
// import SliderNav from './SliderNav'

type SectionUniqueBlock = {
  subtitle: string
  title: string
}

export default function SectionUnique({ block }: { block: SectionUniqueBlock }) {
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const t = useTranslations('SectionUnique')

  const cards = [
    {
      icon: <CanvasIcon className={styles.cardIcon} />,
      title: t('structuredExecution'),
      description: t('structuredExecutionDesc'),
    },
    {
      icon: <GlobeIcon className={styles.cardIcon} />,
      title: t('dataFirstApproach'),
      description: t('dataFirstApproachDesc'),
    },
    {
      icon: <ChartIcon className={styles.cardIcon} />,
      title: t('builtInClarity'),
      description: t('builtInClarityDesc'),
    },
    {
      icon: <ChartBarIcon className={styles.cardIcon} />,
      title: t('truePartnership'),
      description: t('truePartnershipDesc'),
    },
    {
      icon: <DocumentIcon className={styles.cardIcon} />,
      title: t('experienceInTier1Markets'),
      description: t('experienceInTier1MarketsDesc'),
    },
    {
      icon: <AnalyticsIcon className={styles.cardIcon} />,
      title: t('longTermMindset'),
      description: t('longTermMindsetDesc'),
    },
  ]

  const cardsMobile = [
    {
      icon: <CanvasIcon className={styles.cardIcon} />,
      title: t('structuredExecution'),
      description: t('structuredExecutionDesc'),
    },
    {
      icon: <ChartBarIcon className={styles.cardIcon} />,
      title: t('truePartnership'),
      description: t('truePartnershipDesc'),
    },
    {
      icon: <GlobeIcon className={styles.cardIcon} />,
      title: t('dataFirstApproach'),
      description: t('dataFirstApproachDesc'),
    },
    {
      icon: <DocumentIcon className={styles.cardIcon} />,
      title: t('experienceInTier1Markets'),
      description: t('experienceInTier1MarketsDesc'),
    },
    {
      icon: <ChartIcon className={styles.cardIcon} />,
      title: t('builtInClarity'),
      description: t('builtInClarityDesc'),
    },
    {
      icon: <AnalyticsIcon className={styles.cardIcon} />,
      title: t('longTermMindset'),
      description: t('longTermMindsetDesc'),
    },
  ]

  const cardPairsMobile = []
  for (let i = 0; i < cardsMobile.length; i += 1) {
    cardPairsMobile.push(cardsMobile.slice(i, i + 1))
  }

  useEffect(() => {
    setActiveIndex(0)
    swiperRef.current?.slideTo(0)
  }, [block])

  return (
    <section className={styles.section}>
      <div className={styles.headingWrapper}>
        <TabSection style="gray" text={block.subtitle} />
        <MainTitle title={block.title} />
      </div>
      <div className={styles.sectionUnique}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.5 }}
          className={styles.sectionUniqueSide}
        >
          <div className={styles.sideAvatarBlock}>
            <div className={styles.sideAvatarBg}>
              <Image
                width={100}
                height={100}
                src="/images/icons/chat.svg"
                alt="Chat"
                className={styles.sideChatIcon}
              />
            </div>
            <Image
              priority
              width={100}
              height={100}
              src="/images/icons/frame.png"
              alt="Avatar"
              className={styles.sideAvatar}
            />
          </div>
          <div className={styles.sideTitle}>
            {t('youAreHere')} <span>{t('toAchieveResults')}</span>
          </div>
          <div className={styles.sideDescription}>
            <p className={styles.sideText}>{t('orderFirstFreeCall')}</p>
          </div>
          <a href="#call" className={styles.sideButton}>
            <PhoneIcon className={styles.sidePhoneIcon} /> {t('demoCall')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.6 }}
          className={styles.sectionUniqueContent}
        >
          {isMobile ? (
            <>
              <Swiper
                slidesPerView={1.2}
                spaceBetween={8}
                className={styles.swiper}
                onSwiper={(sw) => (swiperRef.current = sw)}
                onSlideChange={(sw) => setActiveIndex(sw.activeIndex)}
              >
                {cardPairsMobile.map((pair, idx) => (
                  <SwiperSlide key={idx}>
                    <div className={styles.slidePair}>
                      {pair.map((card, i) => (
                        <div className={styles.sectionUniqueCard} key={i}>
                          <div className={styles.cardIcon}>{card.icon}</div>
                          <div className={styles.cardBlok}>
                            <div className={styles.cardTitle}>{card.title}</div>
                            <div className={styles.cardDescription}>{card.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <SliderNav
                activeIndex={activeIndex}
                dots={cardPairsMobile.length}
                onPrev={() => swiperRef.current?.slidePrev()}
                onNext={() => swiperRef.current?.slideNext()}
                onDotClick={(i) => swiperRef.current?.slideTo(i)}
              />
            </>
          ) : (
            <div className={styles.sectionUniqueGrid}>
              {cards.map((card, idx) => (
                <div className={styles.sectionUniqueCard} key={idx}>
                  <div className={styles.cardIcon}>{card.icon}</div>
                  <div className={styles.cardBlok}>
                    <div className={styles.cardTitle}>{card.title}</div>
                    <div className={styles.cardDescription}>{card.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
