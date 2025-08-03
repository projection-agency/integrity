'use client'

import { useEffect, useRef } from 'react'
import { usePageTransition } from '@/contexts/PageTransitionContext'

export function usePageLoad() {
  const { setPageReady, isTransitioning } = usePageTransition()
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Якщо відбувається перехід, встановлюємо сторінку як не готову
    if (isTransitioning) {
      setPageReady(false)
      hasInitialized.current = false
      return
    }

    // Якщо це перше завантаження сторінки
    if (!hasInitialized.current) {
      hasInitialized.current = true

      // Для першої сторінки встановлюємо готовність одразу
      setPageReady(true)
    } else {
      // Для наступних сторінок встановлюємо готовність через дуже короткий час
      const timer = setTimeout(() => {
        setPageReady(true)
      }, 50) // Зменшено до 50мс

      return () => {
        clearTimeout(timer)
      }
    }
  }, [setPageReady, isTransitioning])
}
