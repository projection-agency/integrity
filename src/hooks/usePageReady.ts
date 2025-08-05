'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePageTransition } from '@/contexts/PageTransitionContext'

export function usePageReady() {
  const { setPageReady } = usePageTransition()
  const [isReady, setIsReady] = useState(false)
  const [loadStartTime, setLoadStartTime] = useState<number>(Date.now())

  // Функція для перевірки готовності DOM
  const checkDOMReady = useCallback(() => {
    // Перевіряємо чи всі критичні елементи завантажені
    const criticalElements = [
      'main',
      'header',
      'footer',
      '.hero-section', // або інші важливі селектори
    ]

    const allElementsLoaded = criticalElements.every((selector) => {
      const elements = document.querySelectorAll(selector)
      return elements.length > 0
    })

    // Перевіряємо чи всі зображення завантажені
    const images = document.querySelectorAll('img')
    const imagesLoaded = Array.from(images).every((img) => {
      return img.complete && img.naturalHeight !== 0
    })

    // Перевіряємо чи всі шрифти завантажені
    const fontsLoaded = document.fonts?.status === 'loaded' || document.fonts?.ready || true // fallback

    return allElementsLoaded && imagesLoaded && fontsLoaded
  }, [])

  // Функція для перевірки готовності JavaScript
  const checkJSReady = useCallback(() => {
    // Перевіряємо чи всі важкі компоненти ініціалізовані
    const hasFramerMotion = typeof window !== 'undefined' && 'framer-motion' in window
    const hasSwiper = typeof window !== 'undefined' && 'Swiper' in window

    // Перевіряємо чи всі анімації завершилися
    const animationsComplete = !document.querySelector('[data-animating="true"]')

    return animationsComplete
  }, [])

  // Функція для перевірки готовності мережі
  const checkNetworkReady = useCallback(() => {
    // Перевіряємо чи немає активних запитів
    const hasActiveRequests = performance
      .getEntriesByType('resource')
      .some((entry) => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming
          return !resourceEntry.responseEnd || resourceEntry.responseEnd === 0
        }
        return false
      })

    return !hasActiveRequests
  }, [])

  // Основна функція перевірки готовності
  const checkPageReady = useCallback(() => {
    const domReady = checkDOMReady()
    const jsReady = checkJSReady()
    const networkReady = checkNetworkReady()

    const ready = domReady && jsReady && networkReady

    if (ready && !isReady) {
      const loadTime = Date.now() - loadStartTime
      console.log(`Page ready in ${loadTime}ms`)

      setIsReady(true)
      setPageReady(true)
    }

    return ready
  }, [checkDOMReady, checkJSReady, checkNetworkReady, isReady, loadStartTime, setPageReady])

  useEffect(() => {
    // Початкова перевірка
    const initialCheck = () => {
      if (document.readyState === 'complete') {
        checkPageReady()
      }
    }

    // Перевірка після завантаження DOM
    const handleDOMContentLoaded = () => {
      setTimeout(checkPageReady, 100)
    }

    // Перевірка після повного завантаження сторінки
    const handleLoad = () => {
      setTimeout(checkPageReady, 200)
    }

    // Періодична перевірка
    const interval = setInterval(() => {
      if (!isReady) {
        checkPageReady()
      }
    }, 100)

    // Fallback: максимальний час очікування
    const timeout = setTimeout(() => {
      if (!isReady) {
        console.log('Page ready timeout - forcing ready state')
        setIsReady(true)
        setPageReady(true)
      }
    }, 5000) // 5 секунд максимум

    // Додаємо event listeners
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
      window.addEventListener('load', handleLoad)
    } else {
      initialCheck()
    }

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
      window.removeEventListener('load', handleLoad)
    }
  }, [checkPageReady, isReady, setPageReady])

  return {
    isReady,
    loadTime: Date.now() - loadStartTime,
    checkPageReady,
  }
}
