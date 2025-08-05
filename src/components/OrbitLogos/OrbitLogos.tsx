import { useEffect, useRef, useState } from 'react'
import styles from './OrbitLogos.module.css'
import Image from 'next/image'
const radiiVW = ['42.5vw', '35vw', '27vw', '19vw'] // половина від 85, 70, 54, 38
const icons = [
  '/images/ads-icon/meta.svg',
  '/images/ads-icon/adwords.svg',
  '/images/ads-icon/linkedin.svg',
  '/images/ads-icon/tiktok.svg',
]

// Різний порядок іконок для кожного кола
const iconOrders = [
  [0, 1, 2, 3], // Перше коло: meta, adwords, linkedin, tiktok
  [1, 3, 0, 2], // Друге коло: adwords, tiktok, meta, linkedin
  [2, 0, 3, 1], // Третє коло: linkedin, meta, tiktok, adwords
  [3, 2, 1, 0], // Четверте коло: tiktok, linkedin, adwords, meta
]

// Індивідуальні значення повороту для кожного кола (в градусах)
const rotationValues = [
  -90, // Перше коло: 20 градусів
  50, // Друге коло: 15 градусів
  105, // Третє коло: 25 градусів
  140, // Четверте коло: 30 градусів
]

function vwToPx(vw: string, windowWidth: number) {
  return (parseFloat(vw) / 100) * windowWidth
}

const OrbitLogos = () => {
  const refs = useRef<Array<Array<HTMLDivElement | null>>>([])
  const [radiiPx, setRadiiPx] = useState([0, 0, 0, 0])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    function updateRadii() {
      const width = window.innerWidth
      setWindowWidth(width)
      setRadiiPx(radiiVW.map((vw) => vwToPx(vw, width)))
    }
    updateRadii()
    window.addEventListener('resize', updateRadii)
    return () => window.removeEventListener('resize', updateRadii)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const element = refs.current[0]?.[0]?.closest('.wrapper')?.parentElement
      if (!element) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height

      // Розраховуємо прогрес скролу для цього елемента (0-1)
      let progress = 0
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        const scrollDistance = windowHeight - rect.top
        progress = Math.max(0, Math.min(1, scrollDistance / (windowHeight + elementHeight)))
      }

      setScrollProgress(progress * 3)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Викликаємо одразу для початкової позиції

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (radiiPx.some((r) => r === 0)) return

    refs.current.forEach((circleRefs, circleIdx) => {
      const radius = radiiPx[circleIdx]
      const iconsPerCircle = icons.length

      // Індивідуальне значення повороту для кожного кола
      const totalRotationDegrees = rotationValues[circleIdx] || 20
      const rotationRadians = (scrollProgress * totalRotationDegrees * Math.PI) / 180

      // Різні напрямки обертання для різних кіл
      const direction = circleIdx % 2 === 0 ? 1 : -1
      const baseAngle = rotationRadians * direction

      for (let i = 0; i < iconsPerCircle; i++) {
        const el = circleRefs?.[i]
        const iconAngle = (i * Math.PI * 2) / iconsPerCircle
        const totalAngle = baseAngle + iconAngle
        const x =
          windowWidth <= 1024 ? Math.cos(totalAngle) * radius * 3.98 : Math.cos(totalAngle) * radius
        const y =
          windowWidth <= 1024 ? Math.sin(totalAngle) * radius * 3.98 : Math.sin(totalAngle) * radius

        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`
        }
      }
    })
  }, [radiiPx, scrollProgress])

  // Не рендеримо компонент до тих пір, поки не отримаємо розміри вікна
  if (windowWidth === 0) {
    return <div className="wrapper" />
  }

  return (
    <div className="wrapper">
      <div className={styles.orbitContainer}>
        {radiiPx.map((radius, circleIdx) =>
          Array.from({ length: icons.length }).map((_, i) => {
            const iconIndex = iconOrders[circleIdx]?.[i] || i
            return (
              <div
                key={`${circleIdx}-${i}`}
                className={styles.logo}
                ref={(el) => {
                  if (!refs.current[circleIdx]) refs.current[circleIdx] = []
                  refs.current[circleIdx][i] = el
                }}
                style={{ position: 'absolute', left: '50%', top: '50%' }}
              >
                <Image src={icons[iconIndex]} alt="logo" width={100} height={100} />
              </div>
            )
          }),
        )}
        {/* Render 4 background circles */}
        {radiiVW.map((vw, i) => {
          return (
            <div
              key={`circle-${i}`}
              className={styles.circleBg}
              style={
                windowWidth >= 1024
                  ? {
                      width: `calc(${vw} * 2)`,
                      height: `calc(${vw} * 2)`,
                      left: `calc(50% - ${vw})`,
                      top: `calc(50% - ${vw})`,
                      position: 'absolute',
                      borderRadius: '50%',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      pointerEvents: 'none',
                    }
                  : {
                      width: `calc(${vw} * 2 * 3.98)`,
                      height: `calc(${vw} * 2 * 3.98)`,
                      left: `calc(50% - ${vw} *3.98)`,
                      top: `calc(-50% - ${vw}*3.98)`,
                      position: 'absolute',
                      borderRadius: '50%',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      pointerEvents: 'none',
                    }
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default OrbitLogos
