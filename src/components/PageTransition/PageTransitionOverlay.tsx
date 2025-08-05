'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import { usePageReady } from '@/hooks/usePageReady'
import s from './PageTransition.module.css'
import GridBackground from '../GridBackground/GridBackground'

export default function PageTransitionOverlay() {
  const { isTransitioning, isPageReady } = usePageTransition()
  const { isReady, loadTime } = usePageReady()
  const [startTime, setStartTime] = useState<number | null>(null)
  const controls = useAnimation()

  // Показуємо оверлей під час переходу або коли сторінка не готова
  const shouldShowOverlay = isTransitioning || !isPageReady || !isReady

  useEffect(() => {
    if (shouldShowOverlay && !startTime) {
      // Фіксуємо час початку завантаження
      setStartTime(Date.now())
      controls.start({ opacity: 1 })
    } else if (!shouldShowOverlay && startTime) {
      // Розраховуємо тривалість завантаження
      const actualLoadTime = loadTime / 1000 // в секундах
      const minDuration = 0.3 // мінімальна тривалість fade out
      const maxDuration = 1.0 // максимальна тривалість fade out

      const fadeOutDuration = Math.max(minDuration, Math.min(maxDuration, actualLoadTime * 0.2))

      console.log(
        `Page loaded in ${actualLoadTime.toFixed(2)}s, fade out in ${fadeOutDuration.toFixed(2)}s`,
      )

      // Плавно приховуємо оверлей
      controls.start(
        {
          opacity: 0,
        },
        {
          duration: fadeOutDuration,
          ease: 'easeInOut',
        },
      )

      // Скидаємо час початку
      setTimeout(() => {
        setStartTime(null)
      }, fadeOutDuration * 1000)
    }
  }, [shouldShowOverlay, startTime, controls, loadTime])

  return (
    <motion.div
      className={s.pageTransitionOverlay}
      initial={{ opacity: 0 }}
      animate={controls}
      data-animating={shouldShowOverlay}
      style={{
        pointerEvents: shouldShowOverlay ? 'auto' : 'none',
      }}
    >
      {/* Індикатор завантаження */}
      {shouldShowOverlay && <GridBackground />}
    </motion.div>
  )
}
