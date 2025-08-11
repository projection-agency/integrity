'use client'
import { useEffect } from 'react'

export function LordIconProvider() {
  useEffect(() => {
    ;(async () => {
      const lottie = (await import('lottie-web')).default
      const { defineElement } = await import('lord-icon-element')
      defineElement(lottie.loadAnimation)
    })()
  }, [])
  return null
}
