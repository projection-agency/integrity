'use client'

import React, { useRef, useState, useEffect } from 'react'
import s from './OutcomesSection.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { GlobeIcon, ChartIcon, AnalyticsIcon, GroupIcon } from '../../Icon/Icon'
import SliderNav from './SliderNav'
import FillForm from '@/components/FillForm/FillForm'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'

const outcomes = [
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

export default function OutcomesSection({ block }: { block: any }) {
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
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            spaceBetween={8}
            coverflowEffect={{
              rotate: 1,
              stretch: 0,
              depth: 100,
              //   modifier: 0.8,
              //   scale: 0.6,
              modifier: 2,
              scale: 0.9,
              slideShadows: false,
            }}
            pagination={false}
            navigation={{
              nextEl: '.navSwiperNext',
              prevEl: '.navSwiperPrev',
            }}
            observer={true}
            observeParents={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={s.swiperCustom}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
          >
            {outcomes.map((item, idx) => (
              <SwiperSlide
                key={idx}
                style={{ width: '29.999vw', height: '26.719vw', marginRight: '2vw' }}
              >
                <div className={s.card}>
                  <div className={s.cardNumber}>{item.number}</div>
                  <div className={s.cardIcon}>{item.icon}</div>
                  <div className={s.cardTextBlock}>
                    <div className={s.cardTitle}>{item.title}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <SliderNav
          onPrev={() => swiperRef.current?.slidePrev()}
          onNext={() => swiperRef.current?.slideNext()}
        />
        {/* <div className={s.sliderDotsRow}>
          {outcomes.map((_, idx) =>
            idx === swiperIndex ? (
              <span
                key={idx}
                className={s.sliderActiveDot}
                onClick={() => swiperRef.current?.slideToLoop(idx)}
                style={{ cursor: 'pointer' }}
              ></span>
            ) : (
              <span
                key={idx}
                className={s.sliderDot}
                onClick={() => swiperRef.current?.slideToLoop(idx)}
                style={{ cursor: 'pointer' }}
              ></span>
            ),
          )}
        </div> */}
        {/* Додаю SliderNav */}
        {/* <SliderNav
          onPrev={() => swiperRef.current?.slidePrev()}
          onNext={() => swiperRef.current?.slideNext()}
        /> */}
        <FillForm />
      </div>
    </section>
  )
}
