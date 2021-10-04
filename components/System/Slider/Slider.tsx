import { ChangeEvent, FC } from 'react'
import { StyledSlider } from '.'

type Props = {
  onChange: any
  min?: number
  max?: number
}

const Slider: FC<Props> = ({ onChange, min, max }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <StyledSlider>
      <input 
        type="range" 
        min={min ? min : 0} 
        max={max ? max : 60} 
        onChange={(e) => handleChange(e)}
      />
    </StyledSlider>
  )
}

export default Slider
