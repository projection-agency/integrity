'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from './GridBackground.module.css'

const GridBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [smoothCursor, setSmoothCursor] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(true)

  // Throttle для Safari
  const throttleRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)
  const animationRef = useRef<number | null>(null)
  const isSafari =
    typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  const updateDimensions = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    setDimensions({ width: rect.width, height: rect.height })
  }, [])

  // Функція для плавної інтерполяції курсора
  const animateCursor = useCallback(() => {
    const easing = 0.1 // Швидкість інтерполяції (0.1 = плавно, 0.5 = швидко)

    setSmoothCursor((prev) => ({
      x: prev.x + (cursor.x - prev.x) * easing,
      y: prev.y + (cursor.y - prev.y) * easing,
    }))

    animationRef.current = requestAnimationFrame(animateCursor)
  }, [cursor.x, cursor.y])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Не оновлюємо якщо компонент не видимий або це Safari і ми не в фокусі
      if (!isVisible || (isSafari && document.hidden)) return

      const now = Date.now()
      const minInterval = isSafari ? 50 : 8 // 20fps для Safari, 120fps для інших

      if (now - lastUpdateRef.current < minInterval) return
      lastUpdateRef.current = now

      if (throttleRef.current) {
        cancelAnimationFrame(throttleRef.current)
      }

      throttleRef.current = requestAnimationFrame(() => {
        const container = containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        setCursor({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
        throttleRef.current = null
      })
    },
    [isVisible, isSafari],
  )

  // Запускаємо анімацію інтерполяції
  useEffect(() => {
    if (isVisible) {
      animationRef.current = requestAnimationFrame(animateCursor)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animateCursor, isVisible])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    updateDimensions()

    // Перевіряємо видимість компонента
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )
    observer.observe(container)

    // Використовуємо passive: true для кращої продуктивності
    window.addEventListener('resize', updateDimensions, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Для Safari додаємо додаткові оптимізації
    if (isSafari) {
      window.addEventListener('blur', () => setIsVisible(false))
      window.addEventListener('focus', () => setIsVisible(true))
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('mousemove', handleMouseMove)
      if (isSafari) {
        window.removeEventListener('blur', () => setIsVisible(false))
        window.removeEventListener('focus', () => setIsVisible(true))
      }
      if (throttleRef.current) {
        cancelAnimationFrame(throttleRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [updateDimensions, handleMouseMove, isSafari])

  const gridSize = isSafari ? 150 : 150 // Більший розмір для Safari
  const maskRadius = isSafari ? 200 : 200

  // Генеруємо CSS змінні для анімації
  const cssVars = {
    '--cursor-x': `${smoothCursor.x}px`,
    '--cursor-y': `${smoothCursor.y}px`,
    '--mask-radius': `${maskRadius}px`,
    '--grid-size': `${gridSize}px`,
  } as React.CSSProperties

  return <div ref={containerRef} className={styles.gridBackground} style={cssVars} />
}

export default GridBackground
