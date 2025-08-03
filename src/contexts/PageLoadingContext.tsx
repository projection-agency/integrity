'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface PageLoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  currentPath: string
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined)

export function PageLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const handleSetLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  return (
    <PageLoadingContext.Provider
      value={{
        isLoading,
        setIsLoading: handleSetLoading,
        currentPath: pathname,
      }}
    >
      {children}
    </PageLoadingContext.Provider>
  )
}

export function usePageLoading() {
  const context = useContext(PageLoadingContext)
  if (context === undefined) {
    throw new Error('usePageLoading must be used within a PageLoadingProvider')
  }
  return context
}
