'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { usePageLoading } from '@/contexts/PageLoadingContext'
import s from './PageLoader.module.css'
import GridBackground from '../GridBackground/GridBackground'

export default function PageLoader() {
  const { isLoading } = usePageLoading()

  if (!isLoading) return null

  return (
    <motion.div
      className={s.pageLoader}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GridBackground />
    </motion.div>
  )
}
