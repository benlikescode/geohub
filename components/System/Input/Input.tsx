import { FC, useState } from 'react'

import { Icon } from '@components/System'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

import { StyledInput } from './'

type Props = {
  label?: string
  type: string
  placeholder?: string
  value?: string
  callback?: any
  isDisabled?: boolean
  errorMessage?: string
  handleErrors?: () => void
  readOnly?: boolean
  autoComplete?: string
  maxLength?: number
  fontSize?: string
  isTextarea?: boolean
}

const Input: FC<Props> = ({
  label,
  type,
  placeholder,
  value,
  callback,
  isDisabled,
  errorMessage,
  handleErrors,
  readOnly,
  autoComplete,
  maxLength,
  fontSize,
  isTextarea,
}) => {
  const [currValue, setCurrValue] = useState<string | number>(value || '')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleBlur = () => {
    setShowErrorMsg(true)

    if (handleErrors) {
      handleErrors()
    }
  }

  const onInputChange = (input: string | number) => {
    setCurrValue(input)
    setShowErrorMsg(false)

    if (callback) {
      callback(input)
    }
  }

  return (
    <StyledInput fontSize={fontSize}>
      {label && <label>{label}</label>}

      {isTextarea ? (
        <div className="textarea-wrapper">
          <textarea
            placeholder={placeholder}
            onChange={(e) => onInputChange(e.currentTarget.value)}
            value={currValue}
            lang="en"
            readOnly={readOnly}
            onBlur={() => handleBlur()}
            autoComplete={autoComplete}
            maxLength={maxLength || 2000}
          />
        </div>
      ) : (
        <div className="input-wrapper">
          <input
            placeholder={placeholder}
            onChange={(e) => onInputChange(e.currentTarget.value)}
            value={currValue}
            type={showPassword ? 'text' : type}
            lang="en"
            readOnly={readOnly}
            onBlur={() => handleBlur()}
            autoComplete={autoComplete}
            maxLength={maxLength || 2000}
          />

          {type === 'password' && currValue !== '' && (
            <button className="input-icon" type="button" onClick={() => setShowPassword(!showPassword)}>
              <Icon size={18} fill="var(--gray-500)">
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Icon>
            </button>
          )}
        </div>
      )}

      {errorMessage && showErrorMsg && (
        <div className="inputError">
          <svg aria-hidden="true" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="inputErrorText">{errorMessage}</span>
        </div>
      )}
    </StyledInput>
  )
}

export default Input
