'use client'

import React, { useRef, useState, useEffect } from 'react'
import s from './OutcomesSection.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import {
  GlobeIcon,
  ChartIcon,
  AnalyticsIcon,
  GroupIcon,
  Globe2Icon,
  Chart2Icon,
  Analytics2Icon,
  Group6Icon,
} from '../../Icon/Icon'
import SliderNav from './SliderNav'
import ExpertSection from '@/components/sections/ExpertSection/ExpertSection'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'

const outcomes = [
  {
    number: '01',
    icon: <Globe2Icon />,
    title: 'MORE CLARITY METRICS DECISIONS',
  },
  {
    number: '02',
    icon: <Chart2Icon />,
    title: 'STRUCTURE THAT REDUCES WASTE AND GUESSWORK',
  },
  {
    number: '03',
    icon: <Analytics2Icon />,
    title: 'SMARTER CAMPAIGNS ALIGNED WITH REAL BUSINESS GOALS',
  },
  {
    number: '04',
    icon: <Group6Icon />,
    title: 'BETTER ROI THROUGH CONTINUOUS TESTING',
  },
  {
    number: '05',
    icon: <GlobeIcon />,
    title: 'LESS STRESS, MORE FOCUS FOR YOUR TEAM',
  },
  {
    number: '01',
    icon: <GlobeIcon />,
    title: 'MORE CLARITY METRICS DECISIONS',
  },
  {
    number: '02',
    icon: <ChartIcon />,
    title: 'STRUCTURE THAT REDUCES WASTE AND GUESSWORK',
  },
  {
    number: '03',
    icon: <AnalyticsIcon />,
    title: 'SMARTER CAMPAIGNS ALIGNED WITH REAL BUSINESS GOALS',
  },
  {
    number: '04',
    icon: <GroupIcon />,
    title: 'BETTER ROI THROUGH CONTINUOUS TESTING',
  },
  {
    number: '05',
    icon: <GlobeIcon />,
    title: 'LESS STRESS, MORE FOCUS FOR YOUR TEAM',
  },
]

type OutcomesSection = {
  subtitle: string
  title: string
}

export default function OutcomesSection({ block }: { block: OutcomesSection }) {
  const swiperRef = useRef<any>(null)
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className={s.section}>
      <div className={s.headWrapper}>
        <TabSection style="white" text={block.subtitle} />
        <div className={s.wrapHeading}>
          <MainTitle title={block.title} />
          <div className={s.count}>(5)</div>
        </div>
      </div>
      <div className={s.outcomes}>
        <div className={s.sliderWindow}>
          <Swiper
            slidesPerView="auto"
            centeredSlides={true}
            loop={true}
            speed={600}
            pagination={{
              enabled: true,
              clickable: true,
              bulletClass: s.paginationBullet,
              bulletActiveClass: s.bulletActive,
              el: `.${s.paginationCont}`,
            }}
            navigation={{ nextEl: `.${s.navSwiperNext}`, prevEl: `.${s.navSwiperPrev}` }}
            modules={[Pagination, Navigation]}
            className={s.swiperCustomOutcome}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
          >
            {outcomes.map((item, idx) => (
              <SwiperSlide key={idx} className={s.swiperSlide}>
                <div className={s.card}>
                  <div className={s.cardNumberBlock}>
                    <div className={s.cardNumber}>{item.number}</div>
                    <div className={s.cardBlock}>
                      <div className={s.cardIconcBlock}>
                        <div className={s.cardIcon}>{item.icon}</div>
                      </div>
                    </div>
                  </div>

                  <div className={s.cardTextBlock}>
                    <div className={s.cardTitle}>
                      <p className={s.cardTitleText}>{item.title}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={s.controls}>
          <button className={`${s.navSwiperPrev} ${s.swiperNavBtn}`}>{swiperArrow}</button>
          <div className={s.paginationCont}></div>
          <button className={`${s.navSwiperNext} ${s.swiperNavBtn}`}>{swiperArrow}</button>
        </div>
        <ExpertSection />
      </div>
    </section>
  )
}

const swiperArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
    <path d="M19.5 7C20.0523 7 20.5 7.44772 20.5 8C20.5 8.55228 20.0523 9 19.5 9V7ZM0.792892 8.70711C0.402369 8.31658 0.402369 7.68342 0.792892 7.29289L7.15685 0.928932C7.54738 0.538408 8.18054 0.538408 8.57107 0.928932C8.96159 1.31946 8.96159 1.95262 8.57107 2.34315L2.91421 8L8.57107 13.6569C8.96159 14.0474 8.96159 14.6805 8.57107 15.0711C8.18054 15.4616 7.54738 15.4616 7.15685 15.0711L0.792892 8.70711ZM19.5 8V9H1.5V8V7H19.5V8Z" />
  </svg>
)
