'use client'
import styles from './ButtonColor.module.css'
import { useState } from 'react'

type ButtonColorProps = {
  content: string
  onChange: (newContent: string) => void
  ids: {
    id_st_container: string
    id_preview_container: string
    id_fulltext_container: string
  }
}

export default function ButtonColor({ content, onChange, ids }: ButtonColorProps) {
  const [color, setColor] = useState('#000000')
  const [opacity, setOpacity] = useState(1)

  const handleGetSelection = () => {
    const selection = window.getSelection()
    const previewContainer = document.getElementById(ids.id_preview_container)
    const fullTextContainer = document.getElementById(ids.id_fulltext_container)

    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString()
      const anchorNode = selection.anchorNode
      const anchorElement = anchorNode instanceof Element ? anchorNode : anchorNode?.parentElement

      const isInsidePreview = previewContainer?.contains(anchorElement!)
      const isInsideFullText = fullTextContainer?.contains(anchorElement!)

      if ((isInsidePreview || isInsideFullText) && selectedText) {
        const rgba = hexToRgba(color, opacity)

        const spanRegex = new RegExp(
          `<span style="color:\\s*${rgba.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">\\s*${selectedText}\\s*</span>`,
          'gi'
        )

        if (spanRegex.test(content)) {
          const newContent = content.replace(spanRegex, selectedText)
          onChange(newContent)
        } else {
          const coloredSpan = `<span style="color: ${rgba}">${selectedText}</span>`
          const newContent = content.replace(selectedText, coloredSpan)
          onChange(newContent)
        }
      }
    }
  }

  return (
    <div className={styles.btn_container}>
      <input
        type="button"
        value="Paint"
        className={styles.btn_input}
        onClick={handleGetSelection}
      />
      <input
        type="color"
        className={styles.btn_input_color}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div className={styles.btn_opacity_wrapper}>
        <label className={styles.btn_opacity_label}>
          {opacity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className={styles.btn_opacity_slider}
        />
      </div>
    </div>
  )
}

function hexToRgba(hex: string, alpha: number) {
  const bigint = parseInt(hex.replace('#', ''), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`
}
