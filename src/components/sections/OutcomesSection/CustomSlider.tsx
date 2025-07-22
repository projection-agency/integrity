'use client'

import React, { useState, useEffect, useRef } from 'react'
import s from './OutcomesSection.module.css'

interface SliderItem {
  number: string
  icon: React.ReactNode
  title: string
}

interface CustomSliderProps {
  items: SliderItem[]
  onSlideChange?: (index: number) => void
}

export default function CustomSlider({ items, onSlideChange }: CustomSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return

    setIsTransitioning(true)
    setCurrentIndex(index)
    onSlideChange?.(index)

    // Скидаємо стан переходу після завершення анімації
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
    }, 600) // Відповідає CSS transition duration
  }

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % items.length
    goToSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    goToSlide(prevIndex)
  }

  const goToDot = (index: number) => {
    goToSlide(index)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={s.customSliderContainer}>
      <div className={s.customSliderWrapper} ref={containerRef}>
        <div className={s.customSliderTrack}>
          {items.map((item, index) => {
            const isActive = index === currentIndex
            const isPrev = index === (currentIndex - 1 + items.length) % items.length
            const isNext = index === (currentIndex + 1) % items.length

            return (
              <div
                key={index}
                className={`${s.customSliderSlide} ${
                  isActive ? s.active : isPrev ? s.prev : isNext ? s.next : s.inactive
                }`}
                onClick={() => goToSlide(index)}
              >
                <div className={s.card}>
                  <div className={s.cardNumberBlock}>
                    <div className={s.cardNumber}>{item.number}</div>
                    <div className={s.cardBlock}>
                      <div className={s.cardIconcBlock}>
                        <div className={s.cardIcon}>{item.icon}</div>
                      </div>
                    </div>
                  </div>
                  <div className={s.cardTextBlock}>
                    <div className={s.cardTitle}>
                      <p className={s.cardTitleText}>{item.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Навігація */}
      <div className={s.customSliderNav}>
        <button className={s.customSliderArrow} onClick={prevSlide} aria-label="Previous slide">
          <img src="/images/icons/arrow-1.svg" alt="Previous" />
        </button>

        <div className={s.customSliderDots}>
          {items.map((_, index) => (
            <button
              key={index}
              className={`${s.customSliderDot} ${index === currentIndex ? s.active : ''}`}
              onClick={() => goToDot(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button className={s.customSliderArrow} onClick={nextSlide} aria-label="Next slide">
          <img src="/images/icons/arrow-2.svg" alt="Next" />
        </button>
      </div>
    </div>
  )
}
