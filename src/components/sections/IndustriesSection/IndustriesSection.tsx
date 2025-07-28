// // IndustriesSection
// import styles from './IndustriesSection.module.css'
// import { IndustriesGrid } from './IndustriesGrid'
// import { IndustriesHeader } from './IndustriesHeader'

// type IndustriesSection = {
//   subtitle: string
//   title: string
// }

// export default function IndustriesSection({ block }: { block: IndustriesSection }) {
//   return (
//     <section className={styles.section}>
//       <IndustriesHeader block={block} />
//       <IndustriesGrid />
//     </section>
//   )
// }

'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './IndustriesSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import useIsMobile from '../LatestInsightsSection/useIsMobile'

import { RoketIcon, GroupIcon, Group2Icon, Group3Icon, Group4Icon } from '@/components/Icon/Icon'
import { IndustryCard } from './IndustryCard'
import SliderNav from '../SectionUnique/SliderNav'

const industries = [
  {
    cases: 7,
    icon: <RoketIcon />,
    title: 'SAAS & INNOVATION STARTUPS',
    active: true,
    text: 'Campaigns that raise awareness and build trust around ideas, initiatives, and people',
  },
  {
    cases: 9,
    icon: <GroupIcon />,
    title: 'MOBILE APPS & DIGITAL PRODUCTS',
    text: 'Audience-first strategies, designed to grow subscribers and optimise engagement',
  },
  {
    cases: 12,
    icon: <Group2Icon />,
    title: 'B2B SERVICES & MARKETING TECH',
    text: 'Local and regional campaigns designed to connect businesses with real clients',
  },
  {
    cases: 5,
    icon: <Group4Icon />,
    title: 'BUSINESS SERVICES',
    text: 'Lead systems for service-based businesses to capture demand and drive consistent conversions',
  },
  {
    cases: 14,
    icon: <Group3Icon />,
    title: 'ECOMMERCE & DTC BRANDS',
    text: 'Ads and content designed to move product and build loyalty',
  },
]

type IndustriesBlock = {
  subtitle: string
  title: string
  text: string
}

export default function IndustriesSection({ block }: { block: IndustriesBlock }) {
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const pairs: (typeof industries)[] = []
  for (let i = 0; i < industries.length; i += 2) {
    pairs.push(industries.slice(i, i + 2))
  }

  useEffect(() => {
    setActiveIndex(0)
    swiperRef.current?.slideTo(0)
  }, [block])

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <TabSection style="gray" text={block.subtitle} />
        <div className={styles.wrapHeading}>
          <MainTitle title={block.title} />
          <span className={styles.count}>(5)</span>
        </div>
      </header>

      {isMobile ? (
        <>
          <Swiper
            slidesPerView={1.2}
            spaceBetween={8}
            className={styles.swiper}
            onSwiper={(sw) => (swiperRef.current = sw)}
            onSlideChange={(sw) => setActiveIndex(sw.activeIndex)}
          >
            {pairs.map((pair, idx) => (
              <SwiperSlide key={idx}>
                <div className={styles.slidePair}>
                  {pair.map((item, i) => (
                    <IndustryCard
                      key={i}
                      cases={item.cases}
                      icon={item.icon}
                      title={item.title}
                      text={item.text}
                      active={item.active}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <SliderNav
            activeIndex={activeIndex}
            dots={pairs.length}
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
            onDotClick={(idx) => swiperRef.current?.slideTo(idx)}
          />
        </>
      ) : (
        <div className={styles.grid}>
          {industries.map((item, idx) => (
            <IndustryCard key={idx} {...item} />
          ))}
        </div>
      )}
    </section>
  )
}
