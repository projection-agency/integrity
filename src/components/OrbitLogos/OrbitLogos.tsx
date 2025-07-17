import { useEffect, useRef, useState } from 'react'
import styles from './OrbitLogos.module.css'
import Image from 'next/image'
const radiiVW = ['42.5vw', '35vw', '27vw', '19vw'] // половина від 85, 70, 54, 38
const speeds = [0.005, 0.0033, -0.0027, 0.002]
const icons = [
  '/images/ads-icon/meta.svg',
  '/images/ads-icon/adwords.svg',
  '/images/ads-icon/linkedin.svg',
  '/images/ads-icon/tiktok.svg',
]

function vwToPx(vw: string) {
  return (parseFloat(vw) / 100) * window.innerWidth
}

const OrbitLogos = () => {
  const refs = useRef<Array<Array<HTMLDivElement | null>>>([])
  const [radiiPx, setRadiiPx] = useState([0, 0, 0, 0])

  useEffect(() => {
    function updateRadii() {
      setRadiiPx(radiiVW.map((vw) => vwToPx(vw)))
    }
    updateRadii()
    window.addEventListener('resize', updateRadii)
    return () => window.removeEventListener('resize', updateRadii)
  }, [])

  useEffect(() => {
    if (radiiPx.some((r) => r === 0)) return
    let frameId: number
    const angles = radiiPx.map(() => Math.random() * Math.PI * 2)

    const animate = () => {
      refs.current.forEach((circleRefs, circleIdx) => {
        const baseAngle = angles[circleIdx]
        const radius = radiiPx[circleIdx]
        const iconsPerCircle = icons.length
        for (let i = 0; i < iconsPerCircle; i++) {
          const el = circleRefs?.[i]
          const iconAngle = (i * Math.PI * 2) / iconsPerCircle
          const totalAngle = baseAngle + iconAngle
          const x = Math.cos(totalAngle) * radius
          const y = Math.sin(totalAngle) * radius
          if (el) {
            el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`
          }
        }
        angles[circleIdx] += speeds[circleIdx]
      })
      frameId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frameId)
  }, [radiiPx])

  return (
    <div className="wrapper">
      <div className={styles.orbitContainer}>
        {radiiPx.map((radius, circleIdx) =>
          Array.from({ length: icons.length }).map((_, i) => (
            <div
              key={`${circleIdx}-${i}`}
              className={styles.logo}
              ref={(el) => {
                if (!refs.current[circleIdx]) refs.current[circleIdx] = []
                refs.current[circleIdx][i] = el
              }}
              style={{ position: 'absolute', left: '50%', top: '50%' }}
            >
              <Image src={icons[i]} alt="logo" width={100} height={100} />
            </div>
          )),
        )}
        {/* Render 4 background circles */}
        {radiiVW.map((vw, i) => (
          <div
            key={`circle-${i}`}
            className={styles.circleBg}
            style={{
              width: `calc(${vw} * 2)`,
              height: `calc(${vw} * 2)`,
              left: `calc(50% - ${vw})`,
              top: `calc(50% - ${vw})`,
              position: 'absolute',
              borderRadius: '50%',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default OrbitLogos
