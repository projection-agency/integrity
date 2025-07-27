'use client'

import { useState, useEffect } from 'react'

export default function useIsMobile(breakpoint: number = 1024): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  return isMobile
}
