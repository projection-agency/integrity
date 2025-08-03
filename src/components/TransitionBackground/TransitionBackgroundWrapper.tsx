'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import s from './TransitionBackground.module.css'

export default function TransitionBackgroundWrapper() {
  const { isTransitioning } = usePageTransition()

  return (
    <motion.div
      className={s.transitionBackground}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isTransitioning ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    />
  )
}
