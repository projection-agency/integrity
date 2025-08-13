'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1] // плавна bezier

const pageVariants = {
  initial: { y: 100, opacity: 0, scale: 0.9 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease },
  },
  exit: {
    y: 100,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 1, ease },
  },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Вмикаємо оверлей на зміну маршруту
  useEffect(() => {
    setIsTransitioning(true)

    // Скидаємо стан переходу після короткої затримки
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {/* Оверлей фону #222 під час переходу */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[999] bg-[#222]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          // Коли анімація виходу закінчилась — прибираємо оверлей
          setIsTransitioning(false)
          // За бажанням: скрол вгору після кожного переходу
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
          }
        }}
      >
        {/* key обов'язково — щоб AnimatePresence розумів зміну сторінки */}
        <motion.main
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ willChange: 'transform, opacity' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  )
}
