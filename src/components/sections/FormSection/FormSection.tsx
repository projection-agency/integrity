'use client'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import { useState, useEffect } from 'react'
import s from './FormSection.module.css'
import NumberInput from '@/components/NumberInput/NumberInput'
import CountrySelector from '@/components/CountryInput/CountryInput'
import CustomCheckbox from '@/components/CustomCheckbox/CustomCheckbox'
import { object, string } from 'yup'
import Image from 'next/image'
import 'simplebar-react/dist/simplebar.min.css'
import SimpleBar from 'simplebar-react'
import { useCustomToastContext } from '@/contexts/CustomToastProvider'
import { useTranslations } from 'next-intl'

// Validation schema will be created inside the component to access translations

const initialValues = {
  name: '',
  email: '',
  number: '',
  country: '',
  employees: '',
  position: '',
  industry: '',
  stage: '',
  website: '',
}

export interface FormValues {
  name: string
  email: string
  number: string
  country: string
  employees: string
  position: string
  industry: string
  stage: string
  website: string
}

export default function FormSection() {
  const [windowWidth, setWindowWidth] = useState(0)
  const { showSuccessToast, showErrorToast } = useCustomToastContext()
  const t = useTranslations('FormSection')

  // Create validation schema with translations
  const validationSchema = object({
    name: string().required(t('validation.nameRequired')),
    email: string().email(t('validation.emailInvalid')).required(t('validation.emailRequired')),
    number: string().required(t('validation.phoneRequired')),
    country: string().required(t('validation.countryRequired')),
    employees: string().required(t('validation.employeesRequired')),
    position: string().required(t('validation.positionRequired')),
    industry: string().required(t('validation.industryRequired')),
    stage: string().required(t('validation.stageRequired')),
    website: string(),
    message: string(),
  })

  const industries = [
    { name: t('industries.finthech') },
    { name: t('industries.b2b') },
    { name: t('industries.healthcare') },
    { name: t('industries.furniture') },
    { name: t('industries.electronics') },
    { name: t('industries.other') },
  ]

  const stages = [
    { name: t('stages.seed') },
    { name: t('stages.seriesA') },
    { name: t('stages.enterprise') },
  ]

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('/api/order-call-full', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'pk_...',
          'x-api-secret': process.env.NEXT_PUBLIC_API_SECRET || 'sk_...',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.number,
          country: values.country,
          employees: values.employees,
          position: values.position,
          industry: values.industry,
          stage: values.stage,
          website: values.website,
        }),
      })

      if (!response.ok) {
        throw new Error(`Помилка при відправці форми: ${response.status}`)
      }

      const result = await response.json()
      console.log('Form sent successfully:', result)
      showSuccessToast(t('formSentSuccess'))
    } catch (error) {
      console.error('Error:', error)
      showErrorToast(t('formSentError'))
    }
  }

  useEffect(() => {
    // Встановлюємо ширину вікна тільки на клієнті
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)

      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className={s.section} id="strategy">
      <div className={s.leftBlock}>
        <div className={s.content}>
          <div className={s.imagesCont}>
            <div>{chat}</div>
            <Image src={'/images/business-woman.png'} width={118} height={118} alt="woman" />
          </div>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>
      </div>

      <div className={s.formCont}>
        {windowWidth <= 1024 ? (
          <h3>
            {t('mobileTitle')} <span>{report}</span>
          </h3>
        ) : (
          ''
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmit(values)
            actions.resetForm()
          }}
          validationSchema={validationSchema}
        >
          {({ values, errors }) => {
            return (
              <Form className={s.form}>
                <div className={s.inputLine}>
                  <label htmlFor="forName">
                    <p className={s.required}>{t('name')}</p>
                    <Field
                      name="name"
                      id="forName"
                      className={`${s.input}`}
                      placeholder={t('enterName')}
                    />
                    <ErrorMessage name="name">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                  <label htmlFor="forEmail">
                    <p className={s.required}>{t('email')}</p>
                    <Field
                      name="email"
                      id="forEmail"
                      className={`${s.input}`}
                      placeholder={t('enterEmail')}
                    />
                    <ErrorMessage name="email">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                  <label htmlFor="forNumber">
                    <p className={s.required}>{t('phoneNumber')}</p>
                    <NumberInput
                      name="number"
                      id="forNumber"
                      className={`${s.input} ${s.numberInput}`}
                    />
                    <ErrorMessage name="number">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                </div>
                <div className={s.inputLine}>
                  <label htmlFor="forCountry">
                    <p className={s.required}>{t('country')}</p>
                    <CountrySelector />
                    <ErrorMessage name="country">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                  <label htmlFor="forEmployees">
                    <p className={s.required}>{t('employees')}</p>
                    <Field
                      id="forEmployees"
                      type="number"
                      name="employees"
                      placeholder={t('enterEmployees')}
                      className={`${s.input}`}
                    />
                    <ErrorMessage name="employees">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                </div>
                <div className={s.inputLine}>
                  <label htmlFor="forPosition">
                    <p className={s.required}>{t('position')}</p>
                    <Field
                      type="text"
                      name="position"
                      id="forPosition"
                      className={`${s.input}`}
                      placeholder={t('enterPosition')}
                    />
                    <ErrorMessage name="position">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                </div>
                <div className={s.checkboxLineCont}>
                  <p className={s.required}>{t('industry')}</p>
                  <SimpleBar
                    dir="horizontal"
                    forceVisible="x"
                    style={{ maxWidth: '100%' }}
                    className={s.simpleBarCont}
                    autoHide={false}
                  >
                    <div className={`${s.inputLine} ${s.checkboxLine}`}>
                      {industries.map((item, idx) => {
                        return (
                          <CustomCheckbox
                            key={idx}
                            label={item.name}
                            name={'industry'}
                            value={item.name}
                          />
                        )
                      })}
                    </div>
                  </SimpleBar>
                  <ErrorMessage name="industry">
                    {(msg) => <div className={s.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className={s.checkboxLineCont}>
                  <p className={s.required}>{t('companyStage')}</p>
                  <div className={s.inputLine}>
                    <div className={`${s.inputLine} ${s.stagesLine}`}>
                      {stages.map((item, idx) => {
                        return (
                          <CustomCheckbox
                            key={idx}
                            label={item.name}
                            name={'stage'}
                            value={item.name}
                          />
                        )
                      })}
                    </div>
                  </div>
                  <ErrorMessage name="stage">
                    {(msg) => <div className={s.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className={s.inputLine}>
                  <label htmlFor="forWebsite">
                    <p>{t('website')}</p>
                    <Field
                      type="textarea"
                      name="website"
                      id="forWebsite"
                      className={s.input}
                      placeholder={t('enterWebsite')}
                    />
                  </label>
                </div>

                <div className={s.inputLine}>
                  <label htmlFor="forMessage">
                    <p>{t('message')}</p>
                    <Field
                      as="textarea"
                      type="text"
                      name="message"
                      id="forMessage"
                      className={`${s.input} ${s.messageInput}`}
                      placeholder={t('enterMessage')}
                    />
                  </label>
                </div>
                <button type="submit" className={s.submitBtn} onClick={() => console.log(errors)}>
                  <span>
                    {submitIcon} {t('orderCall')}
                  </span>
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
    </section>
  )
}

const chat = (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
    <g clip-path="url(#clip0_678_3415)">
      <path
        d="M13.1873 10.1875C5.95019 10.1875 6.58184e-05 15.1642 6.58184e-05 21.2816C6.58184e-05 23.7269 0.948566 26.2121 2.688 28.1383L0.231691 30.9452C-0.00999668 31.2217 -0.0686217 31.6145 0.0843158 31.9496C0.236316 32.2846 0.569566 32.4998 0.937566 32.4998H14.1248C19.4682 32.4998 26.3744 27.8986 26.3744 21.2816C26.3744 15.1642 20.4243 10.1875 13.1873 10.1875ZM7.49988 23C6.46625 23 5.62494 22.1586 5.62494 21.1251C5.62494 20.0914 6.46632 19.2501 7.49988 19.2501C8.53344 19.2501 9.37481 20.0915 9.37481 21.1251C9.37488 22.1586 8.5335 23 7.49988 23ZM13.1873 23C12.1536 23 11.3123 22.1586 11.3123 21.1251C11.3123 20.0914 12.1537 19.2501 13.1873 19.2501C14.2208 19.2501 15.0622 20.0915 15.0622 21.1251C15.0622 22.1586 14.2209 23 13.1873 23ZM18.8746 23C17.841 23 16.9997 22.1586 16.9997 21.1251C16.9997 20.0914 17.8411 19.2501 18.8746 19.2501C19.9082 19.2501 20.7496 20.0915 20.7496 21.1251C20.7496 22.1586 19.9083 23 18.8746 23Z"
        fill="#222222"
      />
      <path
        d="M31.7758 19.5764L29.5686 17.0011C31.1441 15.2232 32.002 13.0552 32.002 10.8123C32.0019 5.12606 26.5346 0.5 19.8147 0.5C13.7382 0.5 8.57563 4.28681 7.66406 9.21562C9.35956 8.6395 11.261 8.312 13.1899 8.312C21.3995 8.312 28.1444 14.0461 28.2429 21.1245H31.0645C31.8653 21.1246 32.2954 20.1816 31.7758 19.5764Z"
        fill="#222222"
      />
    </g>
    <defs>
      <clipPath id="clip0_678_3415">
        <rect width="32" height="32" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
)

const submitIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.9722 0.565684C14.1681 0.499991 13.1677 0.5 11.8917 0.5H8.10831C6.83229 0.5 5.83189 0.499991 5.02785 0.565684C4.2091 0.632577 3.53273 0.771051 2.92051 1.08299C1.91406 1.59579 1.09579 2.41406 0.582986 3.42051C0.271051 4.03273 0.132577 4.70911 0.0656837 5.52785C-9.25951e-06 6.33189 0 7.33229 0 8.60831V12.5728C0 14.8959 1.88317 16.7791 4.20619 16.7791H4.76596C4.99712 16.7791 5.15519 17.0125 5.06934 17.2272C4.43058 18.8241 6.26967 20.2677 7.66921 19.2681L10.0978 17.5334L10.1435 17.5008C10.803 17.0362 11.5887 16.7843 12.3954 16.7792L12.4515 16.7791H13.0987C14.5392 16.7792 15.418 16.7794 16.1562 16.563C17.9043 16.0504 19.2713 14.6833 19.7839 12.9352C20.0004 12.1971 20.0002 11.3184 20 9.87785V8.60829C20 7.3323 20 6.33188 19.9343 5.52785C19.8674 4.7091 19.7289 4.03273 19.417 3.42051C18.9042 2.41406 18.0859 1.59579 17.0794 1.08299C16.4672 0.771051 15.7909 0.632577 14.9722 0.565684ZM3.55399 2.32625C3.93671 2.13125 4.40902 2.01624 5.14147 1.9564C5.88206 1.89589 6.82557 1.89535 8.13953 1.89535H11.8605C13.1744 1.89535 14.1179 1.89589 14.8585 1.9564C15.591 2.01624 16.0632 2.13125 16.446 2.32625C17.1899 2.70528 17.7947 3.31009 18.1738 4.05399C18.3687 4.43671 18.4837 4.90902 18.5436 5.64147C18.6041 6.38206 18.6046 7.32557 18.6046 8.63953V9.74111C18.6046 11.3615 18.5976 12.0221 18.4449 12.5426C18.066 13.8347 17.0556 14.8451 15.7635 15.224C15.2431 15.3766 14.5824 15.3837 12.962 15.3837H12.4515L12.3865 15.3838C11.2951 15.3908 10.2319 15.7315 9.33972 16.3602L6.85818 18.1326C6.59264 18.3223 6.24369 18.0484 6.36489 17.7454C6.81736 16.6142 5.98429 15.3837 4.76596 15.3837H4.20619C2.6538 15.3837 1.39535 14.1253 1.39535 12.5728V8.63953C1.39535 7.32557 1.39589 6.38206 1.4564 5.64147C1.51624 4.90902 1.63125 4.43671 1.82625 4.05399C2.20528 3.31009 2.81009 2.70528 3.55399 2.32625Z"
    />
    <path d="M7.20812 8.63922C7.20812 9.15298 6.79164 9.56945 6.27789 9.56945C5.76414 9.56945 5.34766 9.15298 5.34766 8.63922C5.34766 8.12547 5.76414 7.70898 6.27789 7.70898C6.79164 7.70898 7.20812 8.12547 7.20812 8.63922Z" />
    <path d="M10.9308 8.63922C10.9308 9.15298 10.5143 9.56945 10.0005 9.56945C9.48678 9.56945 9.07031 9.15298 9.07031 8.63922C9.07031 8.12547 9.48678 7.70898 10.0005 7.70898C10.5143 7.70898 10.9308 8.12547 10.9308 8.63922Z" />
    <path d="M14.6495 8.63922C14.6495 9.15298 14.2331 9.56945 13.7193 9.56945C13.2055 9.56945 12.7891 9.15298 12.7891 8.63922C12.7891 8.12547 13.2055 7.70898 13.7193 7.70898C14.2331 7.70898 14.6495 8.12547 14.6495 8.63922Z" />
  </svg>
)

const report = (
  <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
    <path
      d="M27.9743 28.6646C27.8471 28.7888 27.7199 28.913 27.5928 28.9752L23.0141 30.9627C22.8233 31.0248 22.6961 31.087 22.5054 31.087C22.4418 31.087 22.4418 31.087 22.3782 31.087C21.933 31.087 21.5515 31.087 21.1063 31.087C18.1175 31.087 15.1923 31.087 12.2034 31.087C10.9952 31.087 10.9952 29.2236 12.2034 29.2236H13.4753H21.4243L22.7597 24.8137C22.8233 24.6273 22.8869 24.5031 23.0141 24.3789L28.7374 18.1056L30.6452 15.9938V13.7578C30.6452 13.6957 30.6452 13.6335 30.6452 13.5714H28.7374H23.7136C22.569 13.5714 21.6787 12.6398 21.6787 11.5839V6.86335V5H7.11602C5.39903 5 4 6.36646 4 8.04348V31.9565C4 33.6335 5.39903 35 7.11602 35H27.4656C29.1826 35 30.5816 33.6335 30.5816 31.9565V25.8075L28.6738 27.9193L27.9743 28.6646ZM21.4879 24.7516C21.1063 24.7516 20.7248 24.7516 20.3432 24.7516C17.6088 24.7516 14.9379 24.7516 12.2034 24.7516C10.9952 24.7516 10.9952 22.8882 12.2034 22.8882H13.3481H21.4879C22.6961 22.8882 22.6961 24.7516 21.4879 24.7516ZM22.3782 17.236C23.5864 17.236 23.5864 19.0994 22.3782 19.0994C21.933 19.0994 21.5515 19.0994 21.1063 19.0994C18.1175 19.0994 15.1923 19.0994 12.2034 19.0994C10.9952 19.0994 10.9952 17.236 12.2034 17.236H13.4753H22.3782Z"
      fill="url(#paint0_linear_3388_1549)"
    />
    <path
      d="M23.5234 11.5838C23.5234 11.6459 23.587 11.7081 23.6506 11.7081H27.0846H29.7555C29.7555 11.6459 29.6919 11.6459 29.6919 11.5838L23.8414 5.86954C23.7778 5.80743 23.6506 5.68321 23.5234 5.62109V8.22979V11.5838Z"
      fill="url(#paint1_linear_3388_1549)"
    />
    <path
      d="M33.2266 15.873L33.8991 15.1267L36.0004 16.9332L35.3279 17.6796L33.2266 15.873Z"
      fill="url(#paint2_linear_3388_1549)"
    />
    <path
      d="M24.9844 24.9382L27.1465 26.8015L34.0781 19.0997L31.9795 17.2363L24.9844 24.9382Z"
      fill="url(#paint3_linear_3388_1549)"
    />
    <path
      d="M23.5234 28.6653L25.4948 27.8579L24.1594 26.6777L23.5234 28.6653Z"
      fill="url(#paint4_linear_3388_1549)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3388_1549"
        x1="4.7913"
        y1="-1.23003"
        x2="39.2109"
        y2="3.7954"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#737373" />
        <stop offset="0.255809" stop-color="#222222" />
        <stop offset="0.429644" stop-color="#737373" />
        <stop offset="0.523944" stop-color="#222222" />
        <stop offset="0.784245" stop-color="#222222" />
        <stop offset="1" stop-color="#737373" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_3388_1549"
        x1="23.7085"
        y1="4.35703"
        x2="31.7041"
        y2="5.70273"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#737373" />
        <stop offset="0.255809" stop-color="#222222" />
        <stop offset="0.429644" stop-color="#737373" />
        <stop offset="0.523944" stop-color="#222222" />
        <stop offset="0.784245" stop-color="#222222" />
        <stop offset="1" stop-color="#737373" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_3388_1549"
        x1="32.8102"
        y1="15.4757"
        x2="33.732"
        y2="14.5245"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#737373" />
        <stop offset="0.255809" stop-color="#222222" />
        <stop offset="0.429644" stop-color="#737373" />
        <stop offset="0.523944" stop-color="#222222" />
        <stop offset="0.784245" stop-color="#222222" />
        <stop offset="1" stop-color="#737373" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_3388_1549"
        x1="25.2544"
        y1="15.2499"
        x2="36.9658"
        y2="17.0803"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#737373" />
        <stop offset="0.255809" stop-color="#222222" />
        <stop offset="0.429644" stop-color="#737373" />
        <stop offset="0.523944" stop-color="#222222" />
        <stop offset="0.784245" stop-color="#222222" />
        <stop offset="1" stop-color="#737373" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_3388_1549"
        x1="23.582"
        y1="26.265"
        x2="26.1155"
        y2="26.6781"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#737373" />
        <stop offset="0.255809" stop-color="#222222" />
        <stop offset="0.429644" stop-color="#737373" />
        <stop offset="0.523944" stop-color="#222222" />
        <stop offset="0.784245" stop-color="#222222" />
        <stop offset="1" stop-color="#737373" />
      </linearGradient>
    </defs>
  </svg>
)
