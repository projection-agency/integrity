'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { usePageLoading } from '@/contexts/PageLoadingContext'
import s from './InitialLoader.module.css'
import GridBackground from '../GridBackground/GridBackground'

export default function InitialLoader() {
  const { isLoading } = usePageLoading()

  // Показуємо лоадер тільки під час завантаження
  if (!isLoading) return null

  return (
    <motion.div
      className={s.initialLoader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GridBackground />
    </motion.div>
  )
}
