'use client'

import { useEffect } from 'react'
import { usePageTransition } from '@/contexts/PageTransitionContext'

export default function TransitionBodyBackground() {
  const { isTransitioning } = usePageTransition()

  useEffect(() => {
    // Якщо відбувається перехід, встановлюємо темний фон
    if (isTransitioning) {
      document.body.style.backgroundColor = '#222'
    } else {
      // Скидаємо колір фону
      document.body.style.backgroundColor = ''
    }
  }, [isTransitioning])

  return null
}
