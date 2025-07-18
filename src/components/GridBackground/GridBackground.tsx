'use client'
import { useEffect, useRef } from 'react'

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const gridSize = 120
    const cursor = { x: width / 2, y: height / 2 }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX
      cursor.y = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 0.6

      // Псевдохвиля — автоматично рухається
      const time = Date.now() * 0.001
      const waveX = width / 2 + Math.cos(time * 0.5) * width * 0.4
      const waveY = height / 2 + Math.sin(time * 0.3) * height * 0.4

      // Функція, яка об'єднує силу впливу хвилі + курсора
      const getForceAndAlpha = (x: number, y: number) => {
        // курсор
        const dx1 = x - cursor.x
        const dy1 = y - cursor.y
        const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
        const force1 = Math.max(400 - dist1, 0) * 0.1

        // автохвиля
        const dx2 = x - waveX
        const dy2 = y - waveY
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
        const force2 = Math.max(400 - dist2, 0) * 0.1

        const totalForce = force1 + force2
        const alpha = 0.02 + Math.min(1, totalForce / 100)

        return {
          offsetX: ((dx1 / dist1 || 0) * force1 + (dx2 / dist2 || 0) * force2) * 0.3,
          offsetY: ((dy1 / dist1 || 0) * force1 + (dy2 / dist2 || 0) * force2) * 0.3,
          alpha,
        }
      }

      // вертикальні лінії
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath()
        for (let y = 0; y <= height; y += 10) {
          const { offsetX, alpha } = getForceAndAlpha(x, y)
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`

          if (y === 0) {
            ctx.moveTo(x + offsetX, y)
          } else {
            ctx.lineTo(x + offsetX, y)
          }
        }
        ctx.stroke()
      }

      // горизонтальні лінії
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath()
        for (let x = 0; x <= width; x += 10) {
          const { offsetY, alpha } = getForceAndAlpha(x, y)
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`

          if (x === 0) {
            ctx.moveTo(x, y + offsetY)
          } else {
            ctx.lineTo(x, y + offsetY)
          }
        }
        ctx.stroke()
      }

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default GridBackground
