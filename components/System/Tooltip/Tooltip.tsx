import { FC } from 'react'

import { StyledTooltip } from './'

type Props = {
  label: string
  top?: number
  left?: number
}

const Tooltip: FC<Props> = ({ label, top, left }) => {
  return (
    <StyledTooltip top={top} left={left}>
      <span className="label">{label}</span>
    </StyledTooltip>
  )
}

export default Tooltip
