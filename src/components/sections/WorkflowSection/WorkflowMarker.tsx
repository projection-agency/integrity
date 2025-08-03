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
  const shift = 0.02

  const start = index * stepSize + shift
  const end = (index + 1) * stepSize + shift

  const y = useTransform(scrollYProgress, [start, end], ['0px', '210px'])
  const smoothY = useSpring(y, {
    stiffness: 80,
    damping: 40,
    restDelta: 0.0001,
  })

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0.5, 1, 1, 0.5],
  )
  const smoothOpacity = useSpring(opacity, {
    stiffness: 80,
    damping: 40,
  })

  return (
    <motion.div
      ref={markerRef}
      className={styles['workflow-step-marker']}
      style={{ y: smoothY, opacity: smoothOpacity }}
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
