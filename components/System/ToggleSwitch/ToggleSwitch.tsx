import { ChangeEvent, FC, useState } from 'react'
import { StyledToggleSwitch } from './'

type Props = {
  isActive: boolean
  setIsActive: (isActive: boolean) => void
  activeColor?: string
  inActiveColor?: string
  circleColor?: string
}

const ToggleSwitch: FC<Props> = ({ activeColor, inActiveColor, circleColor, isActive, setIsActive }) => {
  const [active, setActive] = useState(isActive)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.currentTarget.checked

    setActive(newVal)
    setIsActive(newVal)
  }

  return (
    <StyledToggleSwitch activeColor={activeColor} inActiveColor={inActiveColor} circleColor={circleColor}>
      <label className="switch">
        <input type="checkbox" checked={active} onChange={(e) => onInputChange(e)} />
        <span className="slider"></span>
      </label>
    </StyledToggleSwitch>
  )
}

export default ToggleSwitch
