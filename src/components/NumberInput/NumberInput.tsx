import PhoneInput from 'react-phone-input-2'
import './NumberInput.css'
import 'react-phone-input-2/lib/style.css'
import { useFormikContext } from 'formik'

type Props = {
  value?: string
  className?: string
  id?: string
  name: string
}

const NumberInput = ({ value, className, id, name }: Props) => {
  const { values, setFieldValue, setFieldError, setFieldTouched, errors } = useFormikContext<{
    number: string[]
  }>()

  const validatePhone = (phone: string) => {
    return phone.length < 19 ? 'Enter your phone number' : undefined
  }

  return (
    <div className={`inputContainer`} id={id}>
      <PhoneInput
        country={'ua'}
        preferredCountries={['ua', 'ca', 'en', 'de', 'fr', 'it', 'es', 'pl']}
        value={value}
        onChange={(e) => {
          setFieldValue('number', e)

          const error = validatePhone(e)
          if (error) {
            setFieldError('number', error)
          } else {
            setFieldError('number', undefined)
          }
        }}
        onFocus={() => {
          setFieldTouched('number', true)
        }}
        enableSearch={false}
        disableDropdown={false}
        inputProps={{
          name: name,
          required: true,
          autoFocus: false,
        }}
      />
    </div>
  )
}

export default NumberInput
