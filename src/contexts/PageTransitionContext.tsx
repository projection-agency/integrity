'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PageTransitionContextType {
  isTransitioning: boolean
  isPageReady: boolean
  startTransition: (href: string) => Promise<void>
  setPageReady: (ready: boolean) => void
  currentPage: string
  previousPage: string | null
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPageReady, setIsPageReady] = useState(false) // Початково сторінка не готова
  const [currentPage, setCurrentPage] = useState('')
  const [previousPage, setPreviousPage] = useState<string | null>(null)
  const router = useRouter()

  const setPageReady = useCallback((ready: boolean) => {
    setIsPageReady(ready)
  }, [])

  // Ефект для завершення переходу коли сторінка готова
  useEffect(() => {
    if (isTransitioning && isPageReady) {
      // Затримка для анімації входу (нова сторінка з'являється)
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 100) // Зменшено до 100мс

      return () => clearTimeout(timer)
    }
  }, [isTransitioning, isPageReady])

  // Fallback: якщо перехід триває занадто довго, завершуємо його
  useEffect(() => {
    if (isTransitioning) {
      const fallbackTimer = setTimeout(() => {
        setIsTransitioning(false)
        setIsPageReady(true)
      }, 1000) // Зменшено до 1 секунди

      return () => clearTimeout(fallbackTimer)
    }
  }, [isTransitioning])

  const startTransition = useCallback(
    async (href: string) => {
      if (isTransitioning) {
        return
      }

      setIsTransitioning(true)
      setIsPageReady(false) // Нова сторінка ще не готова
      setPreviousPage(currentPage)
      setCurrentPage(href)

      // Починаємо анімацію виходу
      document.body.style.backgroundColor = '#222'

      // Затримка для анімації виходу (попередня сторінка зникає)
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Переходимо на нову сторінку
      router.push(href)

      // Тепер чекаємо на готовність нової сторінки
      // isPageReady буде встановлено в true коли нова сторінка буде готова
    },
    [isTransitioning, currentPage, router],
  )

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        isPageReady,
        startTransition,
        setPageReady,
        currentPage,
        previousPage,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider')
  }
  return context
}
