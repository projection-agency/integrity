'use client'

import React, { useState, useEffect, useRef } from 'react'
import s from './CustomSlider.module.css'
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
  const [currentIndex, setCurrentIndex] = useState(2) // Починаємо з 2, щоб бути в оригінальних слайдах
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const [isAddingClones, setIsAddingClones] = useState(false)
  const [infiniteItems, setInfiniteItems] = useState<SliderItem[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Ініціалізуємо масив з клонованими слайдами
  useEffect(() => {
    const initialItems = [
      ...items.slice(-2), // Останні 2 слайди на початок
      ...items, // Всі оригінальні слайди
      ...items, // Додаткові клони для безкінечного скролу
      ...items.slice(0, 2), // Перші 2 слайди в кінець
    ]
    setInfiniteItems(initialItems)
  }, [items])

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return

    setIsTransitioning(true)
    setCurrentIndex(index + 2) // +2 тому що у нас 2 клоновані слайди на початок
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
    if (isTransitioning || isAddingClones) return

    const nextIndex = currentIndex + 1

    // Додаємо нові клони якщо наближаємося до кінця
    if (nextIndex >= infiniteItems.length - 2 && !isAddingClones) {
      setIsAddingClones(true)
      setIsTransitionEnabled(false)
      const newItems = [...infiniteItems, ...items]
      setInfiniteItems(newItems)
      setTimeout(() => {
        setIsTransitionEnabled(true)
        setIsAddingClones(false)
      }, 10)
    }

    setCurrentIndex(nextIndex)

    // Обчислюємо оригінальний індекс для callback
    const originalIndex =
      nextIndex < 2 ? items.length - 2 + nextIndex : (nextIndex - 2) % items.length
    onSlideChange?.(originalIndex)
  }

  const prevSlide = () => {
    if (isTransitioning || isAddingClones) return

    const prevIndex = currentIndex - 1

    // Додаємо клони на початок якщо наближаємося до початку
    if (prevIndex <= 2 && !isAddingClones) {
      setIsAddingClones(true)
      setIsTransitionEnabled(false)
      const newItems = [...items.slice(-items.length), ...infiniteItems]
      setInfiniteItems(newItems)
      setCurrentIndex((prev) => prev + items.length)
      setTimeout(() => {
        setIsTransitionEnabled(true)
        setIsAddingClones(false)
      }, 1)
      return
    }

    setCurrentIndex(prevIndex)

    const originalIndex =
      prevIndex < 2 ? items.length - 2 + prevIndex : (prevIndex - 2) % items.length
    onSlideChange?.(originalIndex)
  }

  const goToDot = (index: number) => {
    goToSlide(index)
  }

  useEffect(() => {
    const container = containerRef.current
    const activeItem = progressRefs.current[currentIndex]

    if (!container || !activeItem) return

    const onTransitionEnd = () => {
      const itemRect = activeItem.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const containerWidth = container.offsetWidth
      const itemWidth = activeItem.offsetWidth

      const itemOffsetInContainer = itemRect.left - containerRect.left

      const scrollToCenter =
        container.scrollLeft + itemOffsetInContainer - containerWidth / 2 + itemWidth / 2

      container.scrollTo({ left: scrollToCenter, behavior: 'smooth' })

      if (currentIndex === 0) {
        setIsTransitionEnabled(false)
        setCurrentIndex(items.length)
        setTimeout(() => {
          setIsTransitionEnabled(true)
        }, 10)
      }
    }

    activeItem.addEventListener('transitionend', onTransitionEnd)

    return () => {
      activeItem.removeEventListener('transitionend', onTransitionEnd)
    }
  }, [currentIndex, items.length])

  return (
    <div className={s.customSliderContainer}>
      <div
        className={s.customSliderWrapper}
        ref={(el) => {
          containerRef.current = el
        }}
      >
        <div className={s.customSliderTrack}>
          {infiniteItems.map((item, index) => {
            const isActive = index === currentIndex
            const isPrev = index === currentIndex - 1
            const isNext = index === currentIndex + 1

            return (
              <div
                key={index}
                className={`${s.customSliderSlide} ${
                  isActive ? s.active : isPrev ? s.prev : isNext ? s.next : s.inactive
                }${
                  // Додатковий клас для останніх слайдів
                  index > currentIndex + 2 ? s.lastSlide : ''
                }`}
                style={{
                  transition: !isTransitionEnabled ? 'none' : undefined,
                }}
                onClick={() => {
                  // Обчислюємо оригінальний індекс для кліку
                  const originalIndex =
                    index < 2 ? items.length - 2 + index : (index - 2) % items.length
                  if (originalIndex >= 0 && originalIndex < items.length) {
                    goToSlide(originalIndex)
                  }
                }}
                ref={(el) => {
                  progressRefs.current[index] = el
                }}
              >
                <div className={s.card}>
                  <div className={s.cardNumberBlock}>
                    <div className={s.cardNumber}>{item.number}</div>
                    <div className={s.cardBlock}>
                      <div className={s.cardIconBlock}>
                        <div className={s.cardIconWrapper}>
                          <div className={s.cardIcon}>{item.icon}</div>
                        </div>
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
          {navArrow}
        </button>

        <div className={s.customSliderDots}>
          {items.map((_, index) => {
            // Обчислюємо активний індекс для точок
            const activeIndex =
              currentIndex < 2 ? items.length - 2 + currentIndex : (currentIndex - 2) % items.length
            return (
              <button
                key={index}
                className={`${s.customSliderDot} ${index === activeIndex ? s.active : ''}`}
                onClick={() => goToDot(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          })}
        </div>

        <button className={s.customSliderArrow} onClick={nextSlide} aria-label="Next slide">
          {navArrow}
        </button>
      </div>
    </div>
  )
}

const navArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
    <path d="M19 7C19.5523 7 20 7.44772 20 8C20 8.55228 19.5523 9 19 9V7ZM0.292892 8.70711C-0.0976315 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292892 8.70711ZM19 8V9H1V8V7H19V8Z" />
  </svg>
)
