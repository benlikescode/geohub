import { ChangeEvent, FC, useState } from 'react'

import { StyledSlider } from './'

type Props = {
  onChange: (sliderValue: number) => void
  min?: number
  max?: number
  defaultValue?: number
}

const Slider: FC<Props> = ({ onChange, min = 0, max = 60, defaultValue = 0 }) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber
    setValue(value)
    onChange(value)
  }

  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / max}% 100%` }
  }

  return (
    <StyledSlider>
      <input
        type="range"
        min={min}
        max={max}
        onChange={(e) => handleChange(e)}
        defaultValue={defaultValue}
        style={getBackgroundSize()}
      />
    </StyledSlider>
  )
}

export default Slider
