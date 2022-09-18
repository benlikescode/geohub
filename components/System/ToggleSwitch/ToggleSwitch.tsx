import { FC, useState } from 'react'

import { StyledToggleSwitch } from './'

type Props = {
  isActive: boolean
  setIsActive: (isActive: boolean) => void
  activeColor?: string
  inActiveColor?: string
  circleColor?: string
}

const ToggleSwitch: FC<Props> = ({ activeColor, inActiveColor, circleColor, isActive, setIsActive }) => {
  return (
    <StyledToggleSwitch activeColor={activeColor} inActiveColor={inActiveColor} circleColor={circleColor}>
      <label className="switch">
        <input type="checkbox" onChange={() => setIsActive(!isActive)} />
        <span className="slider"></span>
      </label>
    </StyledToggleSwitch>
  )
}

export default ToggleSwitch
