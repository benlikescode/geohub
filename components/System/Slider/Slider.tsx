import { ChangeEvent, FC } from 'react'
import { StyledSlider } from '.'

type Props = {
  onChange: (sliderValue: number) => void
  min?: number
  max?: number
}

const Slider: FC<Props> = ({ onChange, min, max }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value))
  }

  return (
    <StyledSlider>
      <input 
        type="range" 
        min={min ? min : 1} 
        max={max ? max : 61} 
        onChange={(e) => handleChange(e)}
      />
    </StyledSlider>
  )
}

export default Slider
