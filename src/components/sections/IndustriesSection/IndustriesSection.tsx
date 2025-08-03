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

import {
  RoketIcon,
  GroupIcon,
  Group2Icon,
  Group3Icon,
  Group4Icon,
  RoketWhiteIcon,
  Group1WhiteIcon,
  Group2WhiteIcon,
  Group3WhiteIcon,
  Group4WhiteIcon,
} from '@/components/Icon/Icon'
import { IndustryCard } from './IndustryCard'
import SliderNav from '@/components/ui/SliderNav/SliderNav'

const industries = [
  {
    cases: 7,
    icon: <RoketIcon />,
    iconWhite: <RoketWhiteIcon />,
    title: 'SAAS & INNOVATION STARTUPS',
    active: true,
    image: '/images/Industries1.png',
    text: 'Campaigns that raise awareness and build trust around ideas, initiatives, and people',
  },
  {
    cases: 9,
    icon: <GroupIcon />,
    iconWhite: <Group1WhiteIcon />,
    title: 'MOBILE APPS & DIGITAL PRODUCTS',
    image: '/images/Industries2.png',
    text: 'Audience-first strategies, designed to grow subscribers and optimise engagement',
  },
  {
    cases: 12,
    icon: <Group2Icon />,
    iconWhite: <Group2WhiteIcon />,
    title: 'B2B SERVICES & MARKETING TECH',
    image: '/images/Industries3.png',
    text: 'Local and regional campaigns designed to connect businesses with real clients',
  },
  {
    cases: 5,
    icon: <Group4Icon />,
    iconWhite: <Group3WhiteIcon />,
    title: 'BUSINESS SERVICES',
    image: '/images/Industries4.png',
    text: 'Lead systems for service-based businesses to capture demand and drive consistent conversions',
  },
  {
    cases: 14,
    icon: <Group3Icon />,
    iconWhite: <Group4WhiteIcon />,
    title: 'ECOMMERCE & DTC BRANDS',
    image: '/images/Industries5.png',
    text: 'Ads and content designed to move product and build loyalty',
  },
]

type IndustriesBlock = {
  subtitle: string
  title: string
  text: string
}

const industriesMobile = [
  {
    cases: 7,
    icon: <RoketWhiteIcon />,
    title: 'SAAS & INNOVATION STARTUPS',
    active: true,
    image: '/images/Industries1.png',
    text: 'Campaigns that raise awareness and build trust around ideas, initiatives, and people',
  },
  {
    cases: 9,
    icon: <Group1WhiteIcon />,
    title: 'MOBILE APPS & DIGITAL PRODUCTS',
    image: '/images/Industries2.png',
    text: 'Audience-first strategies, designed to grow subscribers and optimise engagement',
  },
  {
    cases: 12,
    icon: <Group2WhiteIcon />,
    title: 'B2B SERVICES & MARKETING TECH',
    image: '/images/Industries3.png',
    text: 'Local and regional campaigns designed to connect businesses with real clients',
  },
  {
    cases: 5,
    icon: <Group3WhiteIcon />,
    title: 'BUSINESS SERVICES',
    image: '/images/Industries4.png',
    text: 'Lead systems for service-based businesses to capture demand and drive consistent conversions',
  },
  {
    cases: 14,
    icon: <Group4WhiteIcon />,
    title: 'ECOMMERCE & DTC BRANDS',
    image: '/images/Industries5.png',
    text: 'Ads and content designed to move product and build loyalty',
  },
]

export default function IndustriesSection({ block }: { block: IndustriesBlock }) {
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const slides = industries.map((item, idx) => (
    <IndustryCard
      key={idx}
      cases={item.cases}
      icon={item.icon}
      iconWhite={item.iconWhite}
      title={item.title}
      text={item.text}
      image={item.image}
      active={item.active}
    />
  ))

  const slidesMobile = industriesMobile.map((item, idx) => (
    <IndustryCard
      key={idx}
      cases={item.cases}
      icon={item.icon}
      title={item.title}
      text={item.text}
      image={item.image}
      active={item.active}
    />
  ))

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
            onSwiper={(sw) => (swiperRef.current = sw)}
            onSlideChange={(sw) => setActiveIndex(sw.activeIndex)}
            className={styles.swiper}
          >
            {slidesMobile.map((card, i) => (
              <SwiperSlide key={i}>
                <div className={styles.slidePair}>{card}</div>
              </SwiperSlide>
            ))}
          </Swiper>
          <SliderNav
            activeIndex={activeIndex}
            dots={slidesMobile.length}
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
            onDotClick={(i) => swiperRef.current?.slideTo(i)}
          />
        </>
      ) : (
        <div className={styles.grid}>{slides}</div>
      )}
    </section>
  )
}
