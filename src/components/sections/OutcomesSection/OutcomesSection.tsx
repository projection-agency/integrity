'use client'

import React, { useState, useEffect } from 'react'
import s from './OutcomesSection.module.css'
import { Group01, Analytics02, Chart03, GlobeIcon04, GlobeIcon05 } from '../../Icon/Icon'
import ExpertSection from '@/components/sections/ExpertSection/ExpertSection'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import CustomSlider from '../../CustomSlider/CustomSlider'
import { useTranslations } from 'next-intl'

type OutcomesSection = {
  subtitle: string
  title: string
}

export default function OutcomesSection({ block }: { block: OutcomesSection }) {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('OutcomesSection')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const outcomes = [
    {
      number: '01',
      icon: <Group01 />,
      title: t('outcomes.0.title'),
    },
    {
      number: '02',
      icon: <Analytics02 />,
      title: t('outcomes.1.title'),
    },
    {
      number: '03',
      icon: <Chart03 />,
      title: t('outcomes.2.title'),
    },
    {
      number: '04',
      icon: <GlobeIcon04 />,
      title: t('outcomes.3.title'),
    },
    {
      number: '05',
      icon: <GlobeIcon05 />,
      title: t('outcomes.4.title'),
    },
  ]

  return (
    <section className={s.section}>
      <div className={s.headWrapper}>
        <TabSection style="white" text={block.subtitle} />
        <div className={s.wrapHeading}>
          <MainTitle title={block.title} />
          <div className={s.count}>{t('count')}</div>
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
