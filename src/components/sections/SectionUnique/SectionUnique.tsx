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
// import SliderNav from './SliderNav'

const cards = [
  {
    icon: <CanvasIcon className={styles.cardIcon} />,
    title: 'STRUCTURED EXECUTION',
    description: 'Every action supports the strategy and drives measurable progress',
  },
  {
    icon: <GlobeIcon className={styles.cardIcon} />,
    title: 'DATA-FIRST APPROACH',
    description: 'Decisions are based on numbers, not gut feeling',
  },
  {
    icon: <ChartIcon className={styles.cardIcon} />,
    title: 'BUILT-IN CLARITY',
    description: 'Every step is structured and transparent',
  },
  {
    icon: <ChartBarIcon className={styles.cardIcon} />,
    title: 'TRUE PARTNERSHIP',
    description: 'We don’t take on projects unless we believe we can create real value',
  },
  {
    icon: <DocumentIcon className={styles.cardIcon} />,
    title: 'EXPERIENCE IN TIER-1 MARKETS',
    description: 'Years of hands-on work across leading global markets',
  },
  {
    icon: <AnalyticsIcon className={styles.cardIcon} />,
    title: 'LONG-TERM MINDSET',
    description: 'No short bursts. We create systems designed to grow, scale, and last',
  },
]

const cardsMobile = [
  {
    icon: <CanvasIcon className={styles.cardIcon} />,
    title: 'STRUCTURED EXECUTION',
    description: 'Every action supports the strategy and drives measurable progress',
  },
  {
    icon: <ChartBarIcon className={styles.cardIcon} />,
    title: 'TRUE PARTNERSHIP',
    description: 'We don’t take on projects unless we believe we can create real value',
  },
  {
    icon: <GlobeIcon className={styles.cardIcon} />,
    title: 'DATA-FIRST APPROACH',
    description: 'Decisions are based on numbers, not gut feeling',
  },

  {
    icon: <DocumentIcon className={styles.cardIcon} />,
    title: 'EXPERIENCE IN TIER-1 MARKETS',
    description: 'Years of hands-on work across leading global markets',
  },
  {
    icon: <ChartIcon className={styles.cardIcon} />,
    title: 'BUILT-IN CLARITY',
    description: 'Every step is structured and transparent',
  },
  {
    icon: <AnalyticsIcon className={styles.cardIcon} />,
    title: 'LONG-TERM MINDSET',
    description: 'No short bursts. We create systems designed to grow, scale, and last',
  },
]

type SectionUniqueBlock = {
  subtitle: string
  title: string
}

export default function SectionUnique({ block }: { block: SectionUniqueBlock }) {
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

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
            YOU ARE HERE <span>TO ACHIEVE RESULTS</span>
          </div>
          <div className={styles.sideDescription}>
            <p className={styles.sideText}>
              Order your first free call and receive a tailored strategy to promote your business
            </p>
          </div>
          <a href="#call" className={styles.sideButton}>
            <PhoneIcon className={styles.sidePhoneIcon} /> Demo call
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
