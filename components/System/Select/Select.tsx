import { FC } from 'react'
import { StyledSelect } from './'

type Props = {
  options: { value: string; label: string }[]
  placeholder?: string
  callback: any
  value?: string
  label?: string
}

const Select: FC<Props> = ({ options, placeholder, callback, value, label }) => {
  return (
    <StyledSelect>
      {label && <label>{label}</label>}

      <div className="select-wrapper">
        <select onChange={callback ? (e) => callback(e.currentTarget.value) : undefined} value={value}>
          {placeholder && <option>{placeholder}</option>}
          {options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="selectSuffix">
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M17 8.517L12 3 7 8.517M7 15.48l5 5.517 5-5.517"></path>
          </svg>
        </span>
      </div>
    </StyledSelect>
  )
}

export default Select
