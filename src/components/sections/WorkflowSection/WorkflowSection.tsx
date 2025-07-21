import React from 'react'
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

const steps = [
  {
    step: 1,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          Initial Contact <br /> and Analytics
        </span>
      </>
    ),
    list: [
      [
        { type: 'desc', text: 'Zoom call ' },
        { type: 'main', text: 'for initial diagnosis' },
        { type: 'desc', text: ' (up to 45 min)' },
      ],
      [{ type: 'main', text: 'Analysis of previous campaigns, funnel, website, analytics' }],
      [
        { type: 'main', text: 'Study of competitors and the market' },
        { type: 'desc', text: ' (manually + through AI analytics)' },
      ],
      [
        { type: 'desc', text: 'Collection ' },
        { type: 'main', text: 'of technical brief and business goals' },
      ],
    ],
    icon: <IconAnalytics />,
  },
  {
    step: 3,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          Preparing for Launch
        </span>
      </>
    ),
    list: [
      [
        { type: 'main', text: 'Producing ad creatives' },
        { type: 'desc', text: ' (UGC, static, video, AI)' },
      ],
      [
        { type: 'main', text: 'Setting up campaigns' },
        { type: 'desc', text: ' (Meta, Google, TikTok, etc.)' },
      ],
      [
        { type: 'main', text: 'Configuring event tracking ' },
        { type: 'desc', text: 'via GTM and GA4' },
      ],
      [
        { type: 'desc', text: 'Creating ' },
        { type: 'main', text: 'a test lead form or landing page' },
      ],
      [
        { type: 'main', text: 'Setting up a client dashboard' },
        { type: 'desc', text: ' (Looker Studio or Google Sheets)' },
      ],
    ],
    icon: <IconResearch />,
  },
  {
    step: 5,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          Scaling
        </span>
      </>
    ),
    list: [
      [
        { type: 'desc', text: 'Expanding into ' },
        { type: 'main', text: 'new channels' },
        { type: 'desc', text: ' (TikTok, YouTube, SEO, Email)' },
      ],
      [
        { type: 'desc', text: 'Implementing ' },
        { type: 'main', text: 'new strategies' },
        { type: 'main', text: ' (retargeting, cross-sell)' },
      ],
      [
        { type: 'desc', text: 'Building ' },
        { type: 'main', text: 'LTV and automation systems' },
        { type: 'desc', text: ' (Email, CRM, analytics)' },
      ],
    ],
    icon: <IconGrowth />,
  },
]

const rightStepsData = [
  {
    step: 2,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          Strategy and Roadmap Development
        </span>
      </>
    ),
    list: [
      [
        { type: 'desc', text: 'Building an ' },
        { type: 'main', text: 'individual strategic funnel' },
      ],
      [
        { type: 'main', text: 'Building a Growth Map' },
        { type: 'desc', text: ' (what to test, what hypotheses, what stages)' },
      ],
      [
        { type: 'main', text: 'Defining KPIs:' },
        { type: 'desc', text: ' CPL, ROAS, CAC, LTV' },
      ],
      [
        { type: 'desc', text: 'Agreeing ' },
        { type: 'main', text: 'on budget and channels' },
      ],
    ],
    icon: <IconMap />,
  },
  {
    step: 4,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          Testing and Optimization
        </span>
      </>
    ),
    list: [
      [
        { type: 'main', text: 'A/B testing ' },
        { type: 'desc', text: 'of creatives, audiences, and offers' },
      ],
      [
        { type: 'desc', text: 'Optimizing based on key metrics:' },
        { type: 'main', text: ' CPC, CTR, CPL, ROAS' },
      ],
      [{ type: 'desc', text: 'Updating creatives, forms, or pages based on data' }],
      [
        { type: 'main', text: 'Regular communication + analytics ' },
        { type: 'desc', text: 'in Looker/spreadsheets' },
      ],
    ],
    icon: <IconForm />,
  },
  {
    step: 6,
    title: (
      <>
        <span style={{ fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
          Continuous Improvement <br /> and Partnership
        </span>
      </>
    ),
    list: [
      [
        { type: 'main', text: 'Strategic calls ' },
        { type: 'desc', text: 'held 1–2 times per month' },
      ],
      [
        { type: 'desc', text: 'Transparent ' },
        { type: 'main', text: 'performance analytics and reporting' },
      ],
      [
        { type: 'desc', text: 'Proactive recommendations ' },
        { type: 'main', text: 'for new growth areas' },
      ],
      [
        { type: 'main', text: 'Optional add-on services:' },
        { type: 'desc', text: ' SEO, email, content, video, CRO' },
      ],
    ],
    icon: <IconFolder />,
  },
]

const addSpaceToDesc = (
  list: { type: string; text: string }[][],
): { type: string; text: string }[][] =>
  list.map((parts: { type: string; text: string }[]) =>
    parts.map((part: { type: string; text: string }, idx: number) =>
      part.type === 'desc' && !part.text.endsWith(' ') ? { ...part, text: part.text + ' ' } : part,
    ),
  )

const stepsWithSpaces = steps.map((step) => ({ ...step, list: addSpaceToDesc(step.list) }))
const rightStepsDataWithSpaces = rightStepsData.map((step) => ({
  ...step,
  list: addSpaceToDesc(step.list),
}))

const rightSteps = [null, ...rightStepsDataWithSpaces]

export default function WorkflowSection({
  block,
}: {
  block?: { enabled?: boolean; title?: string; subtitle?: string; tabStyle?: string }
}) {
  const safeBlock = {
    enabled: true,
    subtitle: 'WORKFLOW',
    title: 'STEP BY STEP [[TO RESULTS]]',
    tabStyle: 'gray',
    ...block,
  }

  if (!safeBlock.enabled) return null

  return (
    <section className={styles['workflow-section']}>
      <div className={styles['workflow-header']}>
        <TabSection
          style={safeBlock.tabStyle}
          text={safeBlock.subtitle}
          // className={styles.workflowTabSection}
        />
        {/* <MainTitle title={safeBlock.title} className={styles.workflowMainTitle} /> */}
        <MainTitle title={safeBlock.title} />
      </div>
      <div className={styles['workflow-section-overlay']} />
      <div className={styles['workflow-grid']}>
        {/* Ліва колонка */}
        <div className={styles['workflow-left']}>
          {stepsWithSpaces.slice(0, 3).map((step, i) => (
            <div
              className={styles['step-card'] + (i >= 1 ? ' ' + styles['step-card--shadow'] : '')}
              key={step.step}
            >
              <div className={styles['step-top-row']}>
                <div className={styles['step-badge']}>STEP {step.step}</div>
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
                      {/* <div className={styles['blok-list-icon']}> */}
                      <span className={styles['step-list-icon']}>
                        <IconDot />
                      </span>
                      {/* </div> */}
                      <span className={styles['step-list-text-wrap']}>
                        {parts.map((part, i) => (
                          <span
                            key={i}
                            className={
                              part.type === 'main'
                                ? styles['step-list-main']
                                : styles['step-list-desc']
                            }
                          >
                            {part.text}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        {/* Центральна колонка */}
        <div className={styles['workflow-line-wrap']}>
          <div className={styles['workflow-line']} />
          <div className={styles['workflow-steps']}>
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <div
                className={
                  styles['step-marker'] + (i >= 1 ? ' ' + styles['step-card--shadow'] : '')
                }
                key={n}
              >
                <div className={styles['step-indicator']}>
                  <span className={styles['step-marker-number']}>
                    {n.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Права колонка */}
        <div className={styles['workflow-right']}>
          {rightSteps.map((step, i) =>
            step ? (
              <div
                className={styles['step-card'] + (i >= 2 ? ' ' + styles['step-card--shadow'] : '')}
                key={step.step}
              >
                <div className={styles['step-top-row']}>
                  <div className={styles['step-badge']}>STEP {step.step}</div>
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
                          {parts.map((part, i) => (
                            <span
                              key={i}
                              className={
                                part.type === 'main'
                                  ? styles['step-list-main']
                                  : styles['step-list-desc']
                              }
                            >
                              {part.text}
                            </span>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
      <GridBackground />
    </section>
  )
}
