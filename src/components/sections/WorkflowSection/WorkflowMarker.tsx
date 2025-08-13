// без марджіна

// 'use client'

// import { motion, useInView, useTransform, useSpring, useScroll } from 'framer-motion'
// import { useRef } from 'react'
// import styles from './WorkflowSection.module.css'

// type Props = {
//   index: number
//   total: number
//   scrollYProgress: any
// }

// export default function WorkflowMarker({ index, total, scrollYProgress }: Props) {
//   const markerRef = useRef(null)

//   const start = index / total
//   const end = (index + 1) / total

//   const y = useTransform(scrollYProgress, [start, end], ['0px', '200px']) // від A до B
//   const smoothY = useSpring(y, {
//     stiffness: 80,
//     damping: 40,
//     restDelta: 0.001,
//   })

//   return (
//     <motion.div ref={markerRef} className={styles['workflow-step-marker']} style={{ y: smoothY }}>
//       <span className={styles['workflow-step-number']}>
//         {(index + 1).toString().padStart(2, '0')}
//       </span>
//     </motion.div>
//   )
// }

// з марджіна

'use client'

import { motion, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import styles from './WorkflowSection.module.css'

type Props = {
  index: number
  total: number
  scrollYProgress: any
}

export default function WorkflowMarker({ index, total, scrollYProgress }: Props) {
  const markerRef = useRef(null)

  const stepSize = 1 / total
  const shift = 0.008 // Зменшуємо shift на 20% для швидшої анімації

  const start = index * stepSize + shift
  const end = (index + 1) * stepSize + shift

  const y = useTransform(scrollYProgress, [start, end], ['0px', '11vw']) // Використовуємо vw замість px
  const smoothY = useSpring(y, {
    stiffness: 60, // Збільшуємо stiffness для швидшої реакції
    damping: 25, // Зменшуємо damping для швидшого завершення
    restDelta: 0.001, // Збільшуємо restDelta для більш стабільного руху
  })

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.024, end - 0.024, end], // Зменшуємо зону активації на 20%
    [0, 1, 1, 1],
  )
  const smoothOpacity = useSpring(opacity, {
    stiffness: 60, // Збільшуємо stiffness для швидшої реакції
    damping: 25, // Зменшуємо damping для швидшого завершення
  })

  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.024, end - 0.024, end], // Зменшуємо зону активації на 20%
    [0.5, 1, 1, 1],
  )
  const smoothScale = useSpring(scale, {
    stiffness: 60, // Збільшуємо stiffness для швидшої реакції
    damping: 25, // Зменшуємо damping для швидшого завершення
  })

  return (
    <motion.div
      ref={markerRef}
      className={styles['workflow-step-marker']}
      style={{ y: smoothY, opacity: smoothOpacity, scale: smoothScale }}
      //   style={{ scaleY: useSpring(scrollYProgress, { stiffness: 80, damping: 40 }) }}
    >
      <div className={styles['step-indicator']}>
        <span className={styles['workflow-step-number']}>
          {(index + 1).toString().padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  )
}
