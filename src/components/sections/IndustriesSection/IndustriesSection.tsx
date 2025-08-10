'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './IndustriesSection.module.css'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import useIsMobile from '../LatestInsightsSection/useIsMobile'
import { useTranslations } from 'next-intl'

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

type IndustriesBlock = {
  subtitle: string
  title: string
  text: string
}

export default function IndustriesSection({ block }: { block: IndustriesBlock }) {
  const isMobile = useIsMobile()
  const t = useTranslations('IndustriesSection')
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const industries = [
    {
      cases: 7,
      icon: <RoketIcon />,
      iconWhite: <RoketWhiteIcon />,
      title: t('saasInnovationStartups'),
      active: true,
      image: '/images/Industries1.png',
      text: t('saasInnovationStartupsDesc'),
    },
    {
      cases: 9,
      icon: <GroupIcon />,
      iconWhite: <Group1WhiteIcon />,
      title: t('mobileAppsDigitalProducts'),
      image: '/images/Industries2.png',
      text: t('mobileAppsDigitalProductsDesc'),
    },
    {
      cases: 12,
      icon: <Group2Icon />,
      iconWhite: <Group2WhiteIcon />,
      title: t('b2bServicesMarketingTech'),
      image: '/images/Industries3.png',
      text: t('b2bServicesMarketingTechDesc'),
    },
    {
      cases: 5,
      icon: <Group4Icon />,
      iconWhite: <Group3WhiteIcon />,
      title: t('businessServices'),
      image: '/images/Industries4.png',
      text: t('businessServicesDesc'),
    },
    {
      cases: 14,
      icon: <Group3Icon />,
      iconWhite: <Group4WhiteIcon />,
      title: t('ecommerceDtcBrands'),
      image: '/images/Industries5.png',
      text: t('ecommerceDtcBrandsDesc'),
    },
  ]

  const industriesMobile = [
    {
      cases: 7,
      icon: <RoketWhiteIcon />,
      title: t('saasInnovationStartups'),
      active: true,
      image: '/images/Industries1.png',
      text: t('saasInnovationStartupsDesc'),
    },
    {
      cases: 9,
      icon: <Group1WhiteIcon />,
      title: t('mobileAppsDigitalProducts'),
      image: '/images/Industries2.png',
      text: t('mobileAppsDigitalProductsDesc'),
    },
    {
      cases: 12,
      icon: <Group2WhiteIcon />,
      title: t('b2bServicesMarketingTech'),
      image: '/images/Industries3.png',
      text: t('b2bServicesMarketingTechDesc'),
    },
    {
      cases: 5,
      icon: <Group3WhiteIcon />,
      title: t('businessServices'),
      image: '/images/Industries4.png',
      text: t('businessServicesDesc'),
    },
    {
      cases: 14,
      icon: <Group4WhiteIcon />,
      title: t('ecommerceDtcBrands'),
      image: '/images/Industries5.png',
      text: t('ecommerceDtcBrandsDesc'),
    },
  ]

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
          <span className={styles.count}>{t('count')}</span>
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
