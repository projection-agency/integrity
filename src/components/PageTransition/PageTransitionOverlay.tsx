'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import s from './PageTransition.module.css'
import GridBackground from '../GridBackground/GridBackground'

export default function PageTransitionOverlay() {
  const { isTransitioning, isPageReady } = usePageTransition()

  // Показуємо оверлей під час переходу або коли сторінка не готова
  const shouldShowOverlay = isTransitioning || !isPageReady

  return (
    <motion.div
      className={s.pageTransitionOverlay}
      initial={{ opacity: 0 }}
      animate={{
        opacity: shouldShowOverlay ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      style={{
        pointerEvents: shouldShowOverlay ? 'auto' : 'none',
      }}
    >
      {/* Індикатор завантаження */}
      {shouldShowOverlay && <GridBackground />}
    </motion.div>
  )
}
