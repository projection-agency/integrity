'use client'
import React, { useRef } from 'react'
import styles from './WorkflowSection.module.css'
import {
  IconAnalytics,
  IconMap,
  IconResearch,
  IconForm,
  IconGrowth,
  IconFolder,
  IconDot,
} from '@/components/Icon/Icon'
import TabSection from '@/components/ui/TabSection/TabSection'
import MainTitle from '@/components/ui/MainTitle/MainTitle'
import GridBackground from '@/components/GridBackground/GridBackground'
import useIsMobile from '../LatestInsightsSection/useIsMobile'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import WorkflowMarker from './WorkflowMarker'
import { useTranslations } from 'next-intl'

const createSteps = (t: any) => [
  {
    step: 1,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          {t('steps.step1.title')}
        </span>
      </>
    ),
    list: Object.values(t.raw('steps.step1.list')).map((item: any) => ({
      type: 'main',
      text: item,
    })),
    icon: <IconAnalytics />,
  },
  {
    step: 3,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          {t('steps.step3.title')}
        </span>
      </>
    ),
    list: Object.values(t.raw('steps.step3.list')).map((item: any) => ({
      type: 'main',
      text: item,
    })),
    icon: <IconResearch />,
  },
  {
    step: 5,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          {t('steps.step5.title')}
        </span>
      </>
    ),
    list: Object.values(t.raw('steps.step5.list')).map((item: any) => ({
      type: 'main',
      text: item,
    })),
    icon: <IconGrowth />,
  },
]

const createRightStepsData = (t: any) => [
  {
    step: 2,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          {t('steps.step2.title')}
        </span>
      </>
    ),
    list: Object.values(t.raw('steps.step2.list')).map((item: any) => ({
      type: 'main',
      text: item,
    })),
    icon: <IconMap />,
  },
  {
    step: 4,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          {t('steps.step4.title')}
        </span>
      </>
    ),
    list: Object.values(t.raw('steps.step4.list')).map((item: any) => ({
      type: 'main',
      text: item,
    })),
    icon: <IconForm />,
  },
  {
    step: 6,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          {t('steps.step6.title')}
        </span>
      </>
    ),
    list: Object.values(t.raw('steps.step6.list')).map((item: any) => ({
      type: 'main',
      text: item,
    })),
    icon: <IconFolder />,
  },
]

const addSpaceToDesc = (list: { type: string; text: string }[]): { type: string; text: string }[] =>
  list.map((part: { type: string; text: string }) =>
    part.type === 'desc' && !part.text.endsWith(' ') ? { ...part, text: part.text + ' ' } : part,
  )

export default function WorkflowSection({
  block,
}: {
  block?: { enabled?: boolean; title?: string; subtitle?: string; tabStyle?: string }
}) {
  const t = useTranslations('WorkflowSection')
  const isMobile = useIsMobile()
  const safeBlock = {
    enabled: true,
    subtitle: t('subtitle'),
    title: t('title'),
    tabStyle: 'dark',
    ...block,
  }

  const lineRef = useRef(null)
  const isInView = useInView(lineRef, { once: false, amount: 0.3 })
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.2', 'end 1'], // Анімація починається коли верхній край досягає 20% від верху, закінчується коли низ торкається низу екрану
  })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])
  const smoothLine = useSpring(line, {
    stiffness: 60, // Збільшуємо stiffness для швидшої реакції
    damping: 25, // Зменшуємо damping для швидшого завершення
  })

  if (!safeBlock.enabled) return null

  const steps = createSteps(t)
  const rightStepsData = createRightStepsData(t)
  const stepsWithSpaces = steps.map((step) => ({ ...step, list: addSpaceToDesc(step.list) }))
  const rightStepsDataWithSpaces = rightStepsData.map((step) => ({
    ...step,
    list: addSpaceToDesc(step.list),
  }))

  const left = stepsWithSpaces
  const right = rightStepsDataWithSpaces
  const rightSteps = [null, ...rightStepsDataWithSpaces]
  const mobileSteps = [
    left.find((s) => s.step === 1)!,
    right.find((s) => s.step === 2)!,
    left.find((s) => s.step === 3)!,
    right.find((s) => s.step === 4)!,
    left.find((s) => s.step === 5)!,
    right.find((s) => s.step === 6)!,
  ]

  return (
    <section ref={sectionRef} className={styles['workflow-section']}>
      <div className={styles['workflow-header']}>
        <TabSection style={safeBlock.tabStyle} text={safeBlock.subtitle} />
        <MainTitle title={safeBlock.title} />
      </div>
      <div className={styles['workflow-section-overlay']} />

      {isMobile ? (
        <div className={styles['workflow-mobile-wrapper']} style={{ position: 'relative' }}>
          <motion.div
            className={styles['workflow-mobile-line']}
            style={{
              scaleY: smoothLine,

              transformOrigin: 'top',
            }}
          />

          <div className={styles['workflow-mobile-list']}>
            {mobileSteps.map((step, i) => (
              <div className={styles['step-wrapper']} key={step.step}>
                <motion.div
                  className={styles['step-marker']}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1.2, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.25,
                    ease: 'easeInOut',
                  }}
                >
                  <div className={styles['step-indicator']}>
                    <span className={styles['step-marker-number']}>
                      {step.step.toString().padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  className={styles['step-card']}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.7 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.25,
                    ease: 'easeInOut',
                  }}
                >
                  <div className={styles['step-top-row']}>
                    <div className={styles['step-badge']}>
                      {t('step')} {step.step}
                    </div>
                    <div className={styles['step-icon-wrapper']}>
                      {step.step === 1 ? (
                        <>
                          <span className={styles['step-icon-blur']} />
                          <span className={styles['step-icon-svg']}>
                            <IconAnalytics />
                          </span>
                        </>
                      ) : (
                        <span className={styles['step-icon-svg']}>{step.icon}</span>
                      )}
                    </div>
                  </div>
                  <div className={styles['step-content-block']}>
                    <h3 className={styles['step-title']}>{step.title}</h3>
                    <ul className={styles['step-list']}>
                      {step.list.map((parts, idx) => (
                        <li className={styles['step-list-item']} key={idx}>
                          <div className={styles['step-list-block']}>
                            <span className={styles['step-list-icon']}>
                              <IconDot />
                            </span>
                          </div>
                          <span className={styles['step-list-text-wrap']}>
                            <span
                              className={
                                parts.type === 'main'
                                  ? styles['step-list-main']
                                  : styles['step-list-desc']
                              }
                            >
                              {parts.text}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles['workflow-grid']}>
          <div className={styles['workflow-left']}>
            {stepsWithSpaces.slice(0, 3).map((step, i) => (
              <motion.div
                key={step.step}
                className={styles['step-card'] + (i >= 1 ? ' ' + styles['step-card--shadow'] : '')}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.7 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.25,
                  ease: 'easeInOut',
                }}
              >
                <div className={styles['step-top-row']}>
                  <div className={styles['step-badge']}>
                    {t('step')} {step.step}
                  </div>
                  <div className={styles['step-icon-wrapper']}>
                    {step.step === 1 ? (
                      <>
                        <span className={styles['step-icon-blur']} />
                        <span className={styles['step-icon-svg']}>
                          <IconAnalytics />
                        </span>
                      </>
                    ) : (
                      <span className={styles['step-icon-svg']}>{step.icon}</span>
                    )}
                  </div>
                </div>
                <div className={styles['step-content-block']}>
                  <h3 className={styles['step-title']}>{step.title}</h3>
                  <ul className={styles['step-list']}>
                    {step.list.map((parts, idx) => (
                      <li className={styles['step-list-item']} key={idx}>
                        <span className={styles['step-list-icon']}>
                          <IconDot />
                        </span>
                        <span className={styles['step-list-text-wrap']}>
                          <span
                            className={
                              parts.type === 'main'
                                ? styles['step-list-main']
                                : styles['step-list-desc']
                            }
                          >
                            {parts.text}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          <div className={styles['workflow-line-wrap']}>
            <motion.div className={styles['workflow-line']} style={{ scaleY: smoothLine }} />
            <div className={styles['workflow-steps']}>
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <WorkflowMarker key={i} index={i} total={6} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
          <div className={styles['workflow-right']}>
            {rightSteps.map((step, i) =>
              step ? (
                <motion.div
                  key={step.step}
                  className={
                    styles['step-card'] + (i >= 1 ? ' ' + styles['step-card--shadow'] : '')
                  }
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.7 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.25,
                    ease: 'easeInOut',
                  }}
                >
                  <div className={styles['step-top-row']}>
                    <div className={styles['step-badge']}>
                      {t('step')} {step.step}
                    </div>
                    <div className={styles['step-icon-wrapper']}>
                      <span className={styles['step-icon-svg']}>{step.icon}</span>
                    </div>
                  </div>

                  <div className={styles['step-content-block']}>
                    <h3 className={styles['step-title']}>{step.title}</h3>
                    <ul className={styles['step-list']}>
                      {step.list.map((parts, idx) => (
                        <li className={styles['step-list-item']} key={idx}>
                          <span className={styles['step-list-icon']}>
                            <IconDot />
                          </span>
                          <span className={styles['step-list-text-wrap']}>
                            <span
                              className={
                                parts.type === 'main'
                                  ? styles['step-list-main']
                                  : styles['step-list-desc']
                              }
                            >
                              {parts.text}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <div
                  className={styles['ghost-block']}
                  key={`ghost-${i}`}
                  style={{ visibility: 'hidden' }}
                ></div>
              ),
            )}
          </div>
        </div>
      )}

      <GridBackground />
    </section>
  )
}
