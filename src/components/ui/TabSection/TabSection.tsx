'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react'
import s from './TabSection.module.css'
import { motion } from 'framer-motion'

const TabSection = ({ style, text }: { style: string; text: string }) => {
  // Генеруємо унікальний ID для кожного екземпляра
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), [])
  const textRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isShinyActive, setIsShinyActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Запускаємо shiny анімацію після появи елемента
          setTimeout(() => {
            setIsShinyActive(true)
          }, 500) // Затримка 500ms після появи
          observer.disconnect()
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => observer.disconnect()
  }, [uniqueId])

  return (
    <motion.div
      key={uniqueId}
      className={`${s[style]} ${s.tabSection}`}
      initial={{ opacity: 0, y: 100 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span ref={textRef} className={`${s.shinyText} ${isShinyActive ? s.shinyActive : ''}`}>
        {text}
      </span>
    </motion.div>
  )
}

export default TabSection
