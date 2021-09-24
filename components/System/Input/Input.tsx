import { FC, useState } from 'react'
import { StyledInput } from '.'

type Props = {
  label?: string
  type: string
  placeholder?: string
  value?: string
  callback?: any
  isDisabled?: boolean
  errorMessage?: string
}

const Input: FC<Props> = ({ label, type, placeholder, value, callback, isDisabled, errorMessage }) => {
  const [currValue, setCurrValue] = useState<string | number>(value || '')
  const [errorState, setErrorState] = useState(false)

  const onInputChange = (input: string | number) => {
    setCurrValue(input)
    setErrorState(false)

    if (callback) {
      callback(input)
    }
  }

  return (
    <StyledInput>
      {label && <label>{ label }</label>}
      <div className="input-styled">
        <input 
        placeholder={placeholder} 
        onChange={(e) => onInputChange(e.currentTarget.value)} 
        value={currValue} 
        type={type}
        lang="en" 
        />
      </div>
      {errorMessage && <span className="inputError">{errorMessage}</span>}
    </StyledInput>
  )
}

export default Input