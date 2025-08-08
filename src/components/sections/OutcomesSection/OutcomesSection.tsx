'use client'

import React, { useState, useEffect } from 'react'
import s from './OutcomesSection.module.css'
import { Group01, Analytics02, Chart03, GlobeIcon04, GlobeIcon05 } from '../../Icon/Icon'
import ExpertSection from '@/components/sections/ExpertSection/ExpertSection'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import CustomSlider from '../../CustomSlider/CustomSlider'

const outcomes = [
  {
    number: '01',
    icon: <Group01 />,
    title: 'MORE CLARITY METRICS DECISIONS',
  },
  {
    number: '02',
    icon: <Analytics02 />,
    title: 'STRUCTURE THAT REDUCES WASTE AND GUESSWORK',
  },
  {
    number: '03',
    icon: <Chart03 />,
    title: 'SMARTER CAMPAIGNS ALIGNED WITH REAL BUSINESS GOALS',
  },
  {
    number: '04',
    icon: <GlobeIcon04 />,
    title: 'BETTER ROI THROUGH CONTINUOUS TESTING',
  },
  {
    number: '05',
    icon: <GlobeIcon05 />,
    title: 'LESS STRESS, MORE FOCUS FOR YOUR TEAM',
  },
]

type OutcomesSection = {
  subtitle: string
  title: string
}

export default function OutcomesSection({ block }: { block: OutcomesSection }) {
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
