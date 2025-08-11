// src/types/lordicon.d.ts
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        trigger?: 'hover' | 'click' | 'loop' | 'morph' | 'boomerang'
        colors?: string // "primary:#222222,secondary:#ffe414"
        delay?: number | string
        state?: string
        target?: string
        stroke?: number | string
        speed?: number | string
        axis?: 'x' | 'y' | 'xy'
      }
    }
  }
}
export {}
