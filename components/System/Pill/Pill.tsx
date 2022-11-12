import { FC } from 'react'

import { StyledPill } from './'

type Props = {
  label: string
  background?: string
  color?: string
  transparent?: boolean
  className?: string
}

const Pill: FC<Props> = ({ label, background, color, transparent, className }) => {
  // if we dont specify we want transparent and we dont pass a background color
  // then we want a random pill color
  if (!background && !transparent) {
    background = '#9D174D'
  }

  return (
    <StyledPill className={className} background={background} color={color} transparent={transparent}>
      <span className="pillLabel">{label}</span>
    </StyledPill>
  )
}

export default Pill
