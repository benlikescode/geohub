import { FC, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { StyledInput } from './'

type Props = {
  id: string
  type: string
  value: string
  callback?: (value: string) => void
  label?: string
  placeholder?: string
  readOnly?: boolean
  autoComplete?: string
  maxLength?: number
  fontSize?: string
  isTextarea?: boolean
  autoFocus?: boolean
}

const Input: FC<Props> = ({
  id,
  label,
  type,
  placeholder,
  value,
  callback,
  readOnly,
  autoComplete,
  maxLength,
  fontSize,
  isTextarea,
  autoFocus,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const onInputChange = (value: string) => {
    if (callback) {
      callback(value)
    }
  }

  return (
    <StyledInput fontSize={fontSize}>
      {label && <label htmlFor={id}>{label}</label>}

      {isTextarea ? (
        <div className="textarea-wrapper">
          <textarea
            id={id}
            placeholder={placeholder}
            onChange={(e) => onInputChange(e.currentTarget.value)}
            value={value}
            lang="en"
            readOnly={readOnly}
            autoComplete={autoComplete}
            maxLength={maxLength || 2000}
            autoFocus={autoFocus}
          />

          {maxLength && typeof value === 'string' && (
            <span className="char-count">{`${value.length} / ${maxLength}`}</span>
          )}
        </div>
      ) : (
        <div className="input-wrapper">
          <input
            id={id}
            placeholder={placeholder}
            onChange={(e) => onInputChange(e.currentTarget.value)}
            value={value}
            type={showPassword ? 'text' : type}
            lang="en"
            readOnly={readOnly}
            autoComplete={autoComplete}
            maxLength={maxLength || 2000}
            autoFocus={autoFocus}
          />

          {type === 'password' && value && (
            <button className="input-icon" type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
      )}
    </StyledInput>
  )
}

export default Input
