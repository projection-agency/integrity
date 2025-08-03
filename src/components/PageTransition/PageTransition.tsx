'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePageTransition } from '@/contexts/PageTransitionContext'
import s from './PageTransition.module.css'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { isTransitioning, isPageReady, currentPage, previousPage } = usePageTransition()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [shouldShowContent, setShouldShowContent] = useState(true)

  useEffect(() => {
    if (!isTransitioning && isPageReady) {
      setDisplayChildren(children)
      setShouldShowContent(true)
    } else {
      // Приховуємо контент під час переходу або коли сторінка не готова
      setShouldShowContent(false)
    }
  }, [children, isTransitioning, isPageReady])

  return (
    <div className={s.pageTransitionContainer}>
      <motion.div
        key={currentPage || 'default'}
        className={s.pageContent}
        initial={{
          y: '10vh',
          opacity: 0,
        }}
        animate={{
          y: shouldShowContent ? 0 : '-10vh',
          opacity: shouldShowContent ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          visibility: shouldShowContent ? 'visible' : 'hidden',
        }}
      >
        {displayChildren}
      </motion.div>
    </div>
  )
}
