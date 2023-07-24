import { FC, InputHTMLAttributes } from 'react'
import { StyledSlider } from './'

type Props = {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const Slider: FC<Props> = ({ value, min, max, onChange, ...rest }) => {
  return (
    <StyledSlider>
      <input
        type="range"
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        value={value}
        style={{ backgroundSize: `${(value * 100) / max}% 100%` }}
        {...rest}
      />
    </StyledSlider>
  )
}

export default Slider
