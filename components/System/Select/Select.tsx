import { FC } from 'react'
import { StyledSelect } from '.'

type Props = {
  options: string[]
  placeholder?: string
  callback: any
  value?: string
}

const Select: FC<Props> = ({ options, placeholder, callback, value }) => {
  return (
    <StyledSelect>
      <select onChange={callback ? (e) => callback(e.currentTarget.value) : undefined} value={value}>
        {placeholder && <option>{placeholder}</option>}
        {options.map((option, idx) => (
          <option key={idx}>{option}</option>
        ))}
      </select>
    </StyledSelect>
  )
}

export default Select