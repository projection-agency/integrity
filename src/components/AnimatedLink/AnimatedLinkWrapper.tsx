'use client'

import React from 'react'
import Link from 'next/link'
import { usePageTransition } from '@/contexts/PageTransitionContext'

interface AnimatedLinkWrapperProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}

export default function AnimatedLinkWrapper({
  href,
  children,
  className,
  onClick,
  ...props
}: AnimatedLinkWrapperProps) {
  const { startTransition, isTransitioning } = usePageTransition()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isTransitioning) return

    // Викликаємо onClick якщо він є
    if (onClick) {
      onClick()
    }

    // Запускаємо анімацію переходу
    await startTransition(href)
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
