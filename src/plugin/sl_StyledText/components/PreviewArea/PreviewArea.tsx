'use client'
import styles from './PreviewArea.module.css'
import { useEffect, useRef } from 'react'

type PreviewAreaProps = {
  content: string
  onChange: (content: any) => void
  id: string
}

export default function PreviewArea({ content, onChange, id}: PreviewAreaProps) {
  const editableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editableRef.current) return
    if (editableRef.current.innerHTML !== content) {
      editableRef.current.innerHTML = content
    }
  }, [content])

  return (
    <div className={styles.preview_container} id={id}>
      <div
        ref={editableRef}
        contentEditable
        className={styles.preview_div}
        suppressContentEditableWarning
        onInput={(e) => {
          const html = (e.currentTarget as HTMLElement).innerHTML
          onChange(html)
        }}
      />
    </div>
  )
}
// <span style="color: green;">Зелений</span>