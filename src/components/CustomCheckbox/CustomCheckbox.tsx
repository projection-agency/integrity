'use client'

import { useFormikContext } from 'formik'
import s from './CustomCheckbox.module.css'
import { FormValues } from '../sections/FormSection/FormSection'

export default function CustomCheckbox({
  label,
  name,
  value,
}: {
  label: string
  name: keyof FormValues
  value: string
}) {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<FormValues>()
  const isActive = values[name] === value
  const toggleValue = () => {
    if (isActive) {
      setFieldValue(name, '')
    } else {
      setFieldValue(name, value)
    }
  }
  return (
    <button
      type="button"
      className={`${s.checkboxLabel} ${isActive ? s.active : ''}`}
      onClick={toggleValue}
      onBlur={() => setFieldTouched(name, true)}
    >
      {isActive ? checkboxChecked : checkboxEmpty}
      <span className={s.labelText}>{label}</span>
    </button>
  )
}

const checkboxEmpty = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={s.icon}
  >
    <circle cx="10" cy="10" r="10" fill="#B5B5B5" />
    <circle cx="10.001" cy="10.0004" r="7.2549" fill="#F9F9F9" />
  </svg>
)

const checkboxChecked = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={s.icon}
  >
    <circle cx="10" cy="10" r="9.5" fill="#F9F9F9" stroke="#222222" />
    <circle cx="10.001" cy="10.0004" r="7.05882" fill="#222222" />
    <circle
      cx="10.001"
      cy="10.0004"
      r="7.05882"
      stroke="url(#paint0_radial_1360_2533)"
      strokeOpacity="0.46"
      strokeWidth="0.392157"
    />
    <circle
      cx="10.001"
      cy="10.0004"
      r="7.05882"
      stroke="url(#paint1_radial_1360_2533)"
      strokeOpacity="0.33"
      strokeWidth="0.392157"
    />
    <circle
      cx="10.001"
      cy="10.0004"
      r="7.05882"
      stroke="url(#paint2_radial_1360_2533)"
      strokeWidth="0.392157"
    />
    <defs>
      <radialGradient
        id="paint0_radial_1360_2533"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20.0573 34.2194) rotate(-116.098) scale(38.882 18.3068)"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_1360_2533"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(2.22634 -7.51485) rotate(55.5429) scale(28.7853 14.5744)"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="paint2_radial_1360_2533"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(10.9715 9.00937) rotate(132.906) scale(10.1171 7.54075)"
      >
        <stop stopColor="#FFEE6B" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
)
