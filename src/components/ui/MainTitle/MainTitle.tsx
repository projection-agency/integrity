'use client'

import React, { useMemo, useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import s from './MainTitle.module.css'

const wordAnimation: any = {
  hidden: { y: '100%', opacity: 0, rotate: 10 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
  }),
}

const MainTitle = ({ title }: { title: string }) => {
  // Генеруємо унікальний ID для кожного екземпляра компонента
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), [])

  // Додаємо стан для контролю анімації
  const [isVisible, setIsVisible] = useState(false)
  const [parsedContent, setParsedContent] = useState<React.ReactNode[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Відключаємо observer після першого спрацювання
        }
      },
      {
        threshold: 0.3, // Анімація запуститься коли 30% елемента буде видно
        rootMargin: '0px 0px -50px 0px', // Додатковий відступ знизу
      },
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Парсимо HTML та розділяємо на слова
    const parseHTML = (html: string) => {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html

      const processNode = (
        node: Node,
        wordIndex: number,
      ): { elements: React.ReactNode[]; nextIndex: number } => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || ''
          const cleanText = text.replace(/&nbsp;/g, ' ').trim()

          if (cleanText) {
            const words = cleanText.split(/\s+/)
            const elements = words.map((word, index) => (
              <motion.div
                key={`${uniqueId}-word-${wordIndex + index}`}
                className={s.word}
                custom={wordIndex + index}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={wordAnimation}
              >
                {word}
              </motion.div>
            ))
            return { elements, nextIndex: wordIndex + words.length }
          }
          return { elements: [], nextIndex: wordIndex }
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          const children: React.ReactNode[] = []
          let currentIndex = wordIndex

          for (const child of Array.from(element.childNodes)) {
            const result = processNode(child, currentIndex)
            children.push(...result.elements)
            currentIndex = result.nextIndex
          }

          if (element.tagName === 'SPAN' || element.tagName === 'DIV') {
            const style = element.getAttribute('style')
            const styleObj = style
              ? style.split(';').reduce((acc: any, style: string) => {
                  const [property, value] = style.split(':').map((s) => s.trim())
                  if (property && value) {
                    const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
                    acc[camelProperty] = value
                  }
                  return acc
                }, {})
              : {}

            return {
              elements: [
                React.createElement(
                  element.tagName.toLowerCase(),
                  {
                    key: `${uniqueId}-${element.tagName}-${wordIndex}`,
                    style: styleObj,
                    className: element.getAttribute('class'),
                  },
                  children,
                ),
              ],
              nextIndex: currentIndex,
            }
          }

          return { elements: children, nextIndex: currentIndex }
        }

        return { elements: [], nextIndex: wordIndex }
      }

      const result = processNode(tempDiv, 0)
      setParsedContent(result.elements)
    }

    parseHTML(title)
  }, [title, uniqueId, isVisible])

  return (
    <h2 ref={titleRef} className={s.mainTitle}>
      {parsedContent}
    </h2>
  )
}

export default MainTitle
