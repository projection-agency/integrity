'use client'
import React, { useEffect, useRef, useState } from 'react'

const GridBackground = () => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [uniqueId] = useState(() => `grid-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const parentElement = svg.parentElement
    if (!parentElement) return

    const updateDimensions = () => {
      const width = parentElement.offsetWidth
      const height = parentElement.offsetHeight
      setDimensions({ width, height })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect()
      setCursor({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const gridSize = 150
  const maskRadius = 200

  // Генеруємо вертикальні лінії
  const verticalLines = []
  for (let x = 0; x <= dimensions.width; x += gridSize) {
    verticalLines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={dimensions.height}
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="0.5"
      />,
    )
  }

  // Генеруємо горизонтальні лінії
  const horizontalLines = []
  for (let y = 0; y <= dimensions.height; y += gridSize) {
    horizontalLines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={dimensions.width}
        y2={y}
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="0.5"
      />,
    )
  }

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <defs>
        <linearGradient
          id={`gridGradient-${uniqueId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.2" stopColor="#222222" />
          <stop offset="0.35" stopColor="#A6A6A6" />
          <stop offset="0.82" stopColor="#222222" />
          <stop offset="1" stopColor="white" />
        </linearGradient>

        <mask id={`gridMask-${uniqueId}`}>
          <rect width="100%" height="100%" fill="black" />
          <circle cx={cursor.x} cy={cursor.y} r={maskRadius} fill="white" />
        </mask>
      </defs>

      {/* Базова сітка */}
      <g>
        {verticalLines}
        {horizontalLines}
      </g>

      {/* Підсвічена сітка */}
      <g mask={`url(#gridMask-${uniqueId})`}>
        {verticalLines.map((line) =>
          React.cloneElement(line, {
            ...line.props,
            stroke: `url(#gridGradient-${uniqueId})`,
            strokeWidth: '1',
          }),
        )}
        {horizontalLines.map((line) =>
          React.cloneElement(line, {
            ...line.props,
            stroke: `url(#gridGradient-${uniqueId})`,
            strokeWidth: '1',
          }),
        )}
      </g>
    </svg>
  )
}

export default GridBackground
