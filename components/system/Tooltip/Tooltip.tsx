import { FC } from 'react'
import { StyledTooltip } from './'

type Props = {
  label: string
  position: 'top' | 'right' | 'bottom' | 'left'
  top?: number
  left?: number
}

const Tooltip: FC<Props> = ({ label, position, top, left }) => {
  return (
    <StyledTooltip top={top} left={left} position={position}>
      <span className="label">{label}</span>
      <div className="arrow"></div>
    </StyledTooltip>
  )
}

export default Tooltip
