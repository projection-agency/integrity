'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import s from './FormSection.module.css'
import NumberInput from '@/components/NumberInput/NumberInput'
import CountrySelector from '@/components/CountryInput/CountryInput'
import CustomCheckbox from '@/components/CustomCheckbox/CustomCheckbox'
import { object, string, number, date, InferType } from 'yup'
import Image from 'next/image'

const industries = [
  { name: 'Finthech' },
  { name: 'B2B' },
  { name: 'Healthecare' },
  { name: 'Furniture & home' },
  { name: 'Electronics' },
  { name: 'Other sectors' },
]

const validationSchema = object({
  name: string().required('Enter your name'),
  email: string().email().required('Enter your email'),
  number: string().required('Enter your phone number'),
  country: string().required('Enter your country'),
  employees: string().required('Enter number of employees'),
  position: string().required('Enter your position'),
  industry: string().required('Enter your industry'),
  stage: string().required('Enter your company stage'),
  website: string(),
  message: string(),
})

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
const stages = [{ name: 'Seed' }, { name: 'Series A or higher' }, { name: 'Enterprise' }]
export default function FormSection() {
  return (
    <section className={s.section}>
      <div className={s.leftBlock}>
        <div className={s.content}>
          <div className={s.imagesCont}>
            <div>{chat}</div>
            <Image src={'/images/business-woman.png'} width={118} height={118} alt="woman" />
          </div>
          <h1>
            Let’s <br />
            unpack your growth potential
          </h1>
          <p>
            Book your free strategy call. Together we’ll analyze your goals and recommend the next
            best steps
          </p>
        </div>
      </div>
      <div className={s.formCont}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          {({ values, errors }) => {
            return (
              <Form className={s.form}>
                <div className={s.inputLine}>
                  <label htmlFor="forName">
                    <p className={s.required}>Name</p>
                    <Field
                      name="name"
                      id="forName"
                      className={`${s.input}`}
                      placeholder="Enter your name"
                    />
                    <ErrorMessage name="name">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                  <label htmlFor="forEmail">
                    <p className={s.required}>Email</p>
                    <Field
                      name="email"
                      id="forEmail"
                      className={`${s.input}`}
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                  <label htmlFor="forNumber">
                    <p className={s.required}>Number</p>
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
                    <p className={s.required}>Country</p>
                    <CountrySelector />
                    <ErrorMessage name="country">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                  <label htmlFor="forEmployees">
                    <p className={s.required}>Number of employees</p>
                    <Field
                      id="forEmployees"
                      type="number"
                      name="employees"
                      placeholder="12"
                      className={`${s.input}`}
                    />
                    <ErrorMessage name="employees">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                </div>
                <div className={s.inputLine}>
                  <label htmlFor="forPosition">
                    <p className={s.required}>Your position in the company</p>
                    <Field
                      type="text"
                      name="position"
                      id="forPosition"
                      className={`${s.input}`}
                      placeholder="Your position"
                    />
                    <ErrorMessage name="position">
                      {(msg) => <div className={s.errorMessage}>{msg}</div>}
                    </ErrorMessage>
                  </label>
                </div>
                <div className={s.checkboxLineCont}>
                  <p className={s.required}>Choose your industry</p>
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
                  <ErrorMessage name="industry">
                    {(msg) => <div className={s.errorMessage}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className={s.checkboxLineCont}>
                  <p className={s.required}>Company stage</p>
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
                    <p>Your company website</p>
                    <Field
                      type="textarea"
                      name="website"
                      id="forWebsite"
                      className={s.input}
                      placeholder="Link"
                    />
                  </label>
                </div>
                <div className={s.inputLine}>
                  <label htmlFor="forMessage">
                    <p>Message</p>
                    <Field
                      type="textarea"
                      name="message"
                      id="forMessage"
                      className={`${s.input} ${s.messageInput}`}
                      placeholder="Enter your message"
                    />
                  </label>
                </div>
                <button type="submit" className={s.submitBtn} onClick={() => console.log(errors)}>
                  {submitIcon} Order a call
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
      fill="white"
    />
    <path
      d="M7.20812 8.63922C7.20812 9.15298 6.79164 9.56945 6.27789 9.56945C5.76414 9.56945 5.34766 9.15298 5.34766 8.63922C5.34766 8.12547 5.76414 7.70898 6.27789 7.70898C6.79164 7.70898 7.20812 8.12547 7.20812 8.63922Z"
      fill="white"
    />
    <path
      d="M10.9308 8.63922C10.9308 9.15298 10.5143 9.56945 10.0005 9.56945C9.48678 9.56945 9.07031 9.15298 9.07031 8.63922C9.07031 8.12547 9.48678 7.70898 10.0005 7.70898C10.5143 7.70898 10.9308 8.12547 10.9308 8.63922Z"
      fill="white"
    />
    <path
      d="M14.6495 8.63922C14.6495 9.15298 14.2331 9.56945 13.7193 9.56945C13.2055 9.56945 12.7891 9.15298 12.7891 8.63922C12.7891 8.12547 13.2055 7.70898 13.7193 7.70898C14.2331 7.70898 14.6495 8.12547 14.6495 8.63922Z"
      fill="white"
    />
  </svg>
)
