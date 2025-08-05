'use client'

import { usePageReady } from '@/hooks/usePageReady'

export default function PageReadyTracker() {
  // Використовуємо хук для відстеження готовності
  usePageReady()

  // Цей компонент не рендерить нічого, тільки відстежує готовність
  return null
}
