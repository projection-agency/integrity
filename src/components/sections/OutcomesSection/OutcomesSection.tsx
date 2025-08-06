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

import ExpertSection from '@/components/sections/ExpertSection/ExpertSection'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import CustomSlider from '../../CustomSlider/CustomSlider'

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
          <CustomSlider items={outcomes} />
        </div>
        <ExpertSection />
      </div>
    </section>
  )
}